'use client'

import React, { useContext } from 'react'
import { JobState, SlideRow, Visualization } from '@/type-definitions';
import { getCaseSlides, getSlideVisualizations } from '@/app/utils/data';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { RootApiContext } from '../../[[...pathParts]]/AuthorizedApp';
import { useQuery } from '@tanstack/react-query';
import JobsInfo from './JobsInfo';
import SlideTable from '../components/Table/SlideTable';
import { Job } from '@/EmpationAPI/src/v3/scope/types/job';

const PROCESSING_STATES = ['ASSEMBLY', 'RUNNING', 'SCHEDULED'];
const COMPLETED_STATES = ['COMPLETED'];
const ERROR_STATES = ['FAILED', 'TIMEOUT', 'ERROR', 'INCOMPLETE'];

type Props = {
  caseObj: CaseH;
  fetchDelayed?: boolean;
}

const getJobStatesFromJobs = (jobs: Job[], appConfig: object) => {
  const jobStates: JobState[] = [];
  jobs.forEach((job) => {
    const inputs = appConfig["modes"][job.mode || "preprocessing"]["inputs"] ?? {};
    const outputs = appConfig["modes"][job.mode || "preprocessing"]["outputs"] ?? {};
    const inputKeys = Object.keys(inputs);
    const outputKeys = Object.keys(outputs);
    const inputIds = inputKeys.map((key) => job.inputs[key]);
    const outputIds = outputKeys.map((key) => job.inputs[key]);
    let status;
    let visualization: Visualization | undefined;
    let background;
    if(ERROR_STATES.includes(job.status)) {
      status = "error";
    }
    if(COMPLETED_STATES.includes(job.status)) {
      status = "completed";
      visualization = {
        name: `${appConfig["name"] || "Job"} output`,
        shaders: Object.fromEntries(outputKeys.map((key) => [key, {...outputs[key], _layer_loc: undefined}])),
      }
      background = inputKeys.map((key, idx) => ({...inputs[key], _layer_loc: undefined, dataReference: idx }));
    }
    if(PROCESSING_STATES.includes(job.status)) {
      status = "processing";
    }

    jobStates.push({status: status, inputs: inputIds, outputs: outputIds, visualization: visualization, background: background})
  })

  return jobStates;
}

const getSlideRows = (caseObj: CaseH, slides: Slide[], jobs: JobState[]) => {
  const slideTableRows: SlideRow[] = slides.map((slide) => ({slide: slide, caseObj: caseObj, jobs: jobs}))
  return slideTableRows;
}

const CaseContent = ({ caseObj, fetchDelayed=false }: Props) => {
  const rootApi = useContext(RootApiContext);

  const getCaseSlidesQuery= async () => {
    const slides = await getCaseSlides(rootApi!, caseObj.id)
    return slides
  };

  const { isPending, isError, data: slides } = useQuery({
    queryKey: [`case_${caseObj.id}_content`],
    queryFn: getCaseSlidesQuery,
    enabled: !fetchDelayed && rootApi !== undefined,
  })

  const getCaseJobs = async () => {
    const examinations = (await rootApi!.examinations.query({
      cases: [caseObj.id],
    })).items;

    let validJobs: JobState[] = []

    for(let i = 0; i < examinations.length; i = i+1) {
      const examination = examinations[i];
      const appConfig = await rootApi!.rationai.globalStorage.jobConfig.getJobConfig(examination.app_id);
      if(appConfig) {
        const scope = await rootApi!.getScopeFrom(examination);
        const jobs = await scope.jobs.getJobs();
        validJobs = validJobs.concat(getJobStatesFromJobs(jobs, appConfig))
      }
    }
    console.log(validJobs)
    return validJobs;
  };

  const { isPending: isPendingJobs, isError: isErrorJobs, data: jobs } = useQuery({
    queryKey: [`case_${caseObj.id}_content`],
    queryFn: getCaseJobs,
    enabled: slides && rootApi !== undefined,
  })

  if (isPending || isPendingJobs) {
    return <div>Loading...</div>
  }

  if (isError || isErrorJobs) {
    return <div>Unable to fetch data</div>
  }

  return (
    <div className='py-1 flex flex-col gap-2'>
      <JobsInfo caseId={caseObj.id} fetchDelayed={fetchDelayed}/>
      <SlideTable slideRows={getSlideRows(caseObj, slides, jobs)} showHeader={false}/>
      {slides.length === 0 && <div className='font-sans font-semibold text-slate-300 px-3 pt-1'>Case has no slides</div>}
    </div>
  )
}

export default CaseContent