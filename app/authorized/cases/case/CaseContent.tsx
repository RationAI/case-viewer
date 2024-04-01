'use client'

import React, { useContext } from 'react'
import Table from '../components/Table/Table'
import { TableStructureT, VisualizationConfig } from '@/type-definitions';
import { getCaseSlides, getSlideVisualizations } from '@/app/utils/data';
import { Case } from '@/EmpationAPI/src/v3/root/types/case';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { RootApiContext } from '../../[[...pathParts]]/AuthorizedApp';
import { useQuery } from '@tanstack/react-query';

type Props = {
  caseObj: CaseH;
  showCaseName: boolean;
  basePath: string;
  fetchDelayed?: boolean;
}

const getTableStructureFromCaseContents = (caseInfo: Case, caseHierPath: string, slides: Slide[], slideVisualizations: object[], showCaseName: boolean) => {
  const tableStructure: TableStructureT = { 
    name: showCaseName ? (caseInfo.local_id || caseInfo.id) : undefined,
    slides: slides.map((slide, idx) => { 
      return ({
        slideId: slide.id,
        casePath: caseHierPath,
        name: slide.local_id?.split('.')[-1] || slide.id,
        created: new Date(slide.created_at).toISOString(),
        metadata: {
          something: "something",
        },
        visualizationConfig: slideVisualizations[idx] as VisualizationConfig
      })
    })
  }
  return tableStructure;
}

const CaseContent = ({ caseObj, showCaseName, basePath, fetchDelayed=false}: Props) => {
  const rootApi = useContext(RootApiContext);

  const getCaseContent = async () => {
    const slides = await getCaseSlides(rootApi!, caseObj.id)
    const rationaiApi = rootApi!.rationai;
    const visualizations = await Promise.all(slides.map(async (slide) => {
      const vis = await getSlideVisualizations(slide.id, rationaiApi)
      return vis;
    }))
    await rootApi?.scopes.use(caseObj.id);
    const jobs = await rootApi?.scopes.rawQuery('jobs');
    console.log(jobs)
    return {slides: slides, visualizations: visualizations}
  };

  const { isPending, isError, data } = useQuery({
    queryKey: [`case_${caseObj.id}_content`],
    queryFn: getCaseContent,
    enabled: !fetchDelayed,
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Unable to fetch data</div>
  }

  return (
    <div>
      <Table tableStructure={getTableStructureFromCaseContents(caseObj, `${basePath}${caseObj.pathInHierarchy}`, data.slides, data.visualizations, showCaseName)}/>
      {data.slides.length === 0 && <div className='font-sans font-semibold text-slate-300 px-3 pt-1'>Case has no slides</div>}
    </div>
  )
}

export default CaseContent