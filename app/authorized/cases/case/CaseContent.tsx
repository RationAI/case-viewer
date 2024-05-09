'use client';

import React, { createContext, useContext } from 'react';
import { JobState, SlideRowT, Visualization } from '@/type-definitions';
import { getCaseSlides } from '@/app/utils/data';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { RootApiContext } from '../../[[...pathParts]]/AuthorizedApp';
import { useQuery } from '@tanstack/react-query';
import SlideTable from '../components/Table/SlideTable';
import { Job } from '@/EmpationAPI/src/v3/scope/types/job';
import { WorkbenchServiceApiV3CustomModelsExaminationsExamination } from '@/EmpationAPI/src/v3/root/types/workbench-service-api-v-3-custom-models-examinations-examination';
import Loading from '@/app/components/Loading/Loading';
import FetchError from '@/app/components/FetchError/FetchError';

const PROCESSING_STATES = ['ASSEMBLY', 'RUNNING', 'SCHEDULED'];
const COMPLETED_STATES = ['COMPLETED'];
const ERROR_STATES = ['FAILED', 'TIMEOUT', 'ERROR', 'INCOMPLETE'];

type Props = {
  caseObj: CaseH;
  fetchActive?: boolean;
};

export const ValidJobsContext = createContext<JobState[]>([]);

const getJobStatesFromJobs = (
  jobs: Job[],
  appConfig: object,
  examination: WorkbenchServiceApiV3CustomModelsExaminationsExamination,
) => {
  const jobStates: JobState[] = [];
  jobs.forEach((job) => {
    const inputs =
      appConfig['modes'][job.mode?.toLowerCase() || 'preprocessing'][
        'inputs'
      ] ?? {};
    const outputs =
      appConfig['modes'][job.mode?.toLowerCase() || 'preprocessing'][
        'outputs'
      ] ?? {};
    const inputKeys = Object.keys(inputs);
    const outputKeys = Object.keys(outputs);
    const inputIds = inputKeys.map((key) => job.inputs[key]);
    const outputIds = outputKeys.map((key) => job.outputs[key]);
    let status;
    let visualization: Visualization | undefined;
    let background;
    if (ERROR_STATES.includes(job.status)) {
      status = 'error';
    }
    if (COMPLETED_STATES.includes(job.status)) {
      status = 'completed';
      visualization = {
        name: `${appConfig['name'] || 'Job'} output`,
        protocol: appConfig['visProtocol'],
        shaders: Object.fromEntries(
          outputKeys.map((key, idx) => [
            key,
            {
              ...outputs[key],
              _layer_loc: undefined,
              dataReferences: [inputKeys.length + idx],
            },
          ]),
        ),
      };
      background = inputKeys.map((key, idx) => ({
        ...inputs[key],
        _layer_loc: undefined,
        dataReference: idx,
      }));
    }
    if (PROCESSING_STATES.includes(job.status)) {
      status = 'processing';
    }

    jobStates.push({
      caseId: examination.case_id,
      appId: examination.app_id,
      id: job.id,
      status: status,
      inputs: inputIds,
      outputs: outputIds,
      visualization: visualization,
      background: background,
      name: appConfig['name'],
      description: appConfig['description'],
    });
  });

  return jobStates;
};

const getSlideRows = (caseObj: CaseH, slides: Slide[], jobs: JobState[]) => {
  const slideTableRows: SlideRowT[] = slides.map((slide) => ({
    slide: slide,
    caseObj: caseObj,
    jobs: jobs,
  }));
  return slideTableRows;
};

const CaseContent = ({ caseObj, fetchActive = true }: Props) => {
  const rootApi = useContext(RootApiContext);
  const getCaseSlidesQuery = async () => {
    const slides = await getCaseSlides(rootApi!, caseObj.id);
    return slides;
  };

  const {
    isPending,
    isError,
    data: slides,
  } = useQuery({
    queryKey: [`case_${caseObj.id}_slides`],
    queryFn: getCaseSlidesQuery,
    enabled: fetchActive && rootApi !== undefined,
  });

  const getCaseJobs = async () => {
    console.log(`Fetching job info: ${caseObj.local_id || caseObj.id}`);
    const examinations = (
      await rootApi!.examinations.query({
        cases: [caseObj.id],
      })
    ).items;

    let validJobs: JobState[] = [];
    for (let i = 0; i < examinations.length; i = i + 1) {
      const examination = examinations[i];
      const appConfig =
        await rootApi!.rationai.globalStorage.jobConfig.getJobConfig(
          examination.app_id,
        );
      if (appConfig) {
        const scope = await rootApi!.getScopeFrom(examination);
        const jobs = await scope.jobs.getJobs();
        validJobs = validJobs.concat(
          getJobStatesFromJobs(jobs, appConfig, examination),
        );
      }
    }
    return validJobs;
  };

  const {
    isPending: isPendingJobs,
    isError: isErrorJobs,
    data: jobs,
  } = useQuery({
    queryKey: [`case_${caseObj.id}_jobs`],
    queryFn: getCaseJobs,
    enabled: fetchActive && rootApi !== undefined,
    refetchInterval: 1000 * 30,
  });

  if (isPending || isPendingJobs) {
    return <Loading />;
  }

  if (isError || isErrorJobs) {
    return <FetchError message="Case content" />;
  }

  return (
    <ValidJobsContext.Provider value={jobs}>
      <div className="flex flex-col gap-2 py-1">
        <div className="text-sm font-normal">{caseObj.description}</div>
        <SlideTable
          slideRows={getSlideRows(caseObj, slides, jobs)}
          showHeader={false}
        />
        {slides.length === 0 && (
          <div className="px-3 pt-1 font-sans font-semibold text-slate-300">
            Case has no slides
          </div>
        )}
      </div>
    </ValidJobsContext.Provider>
  );
};

export default CaseContent;
