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
import JobsInfo from './JobsInfo';

type Props = {
  caseObj: CaseH;
  basePath: string;
  fetchDelayed?: boolean;
}

const getTableStructureFromCaseContents = (caseObj: CaseH, basePath: string, slides: Slide[], slideVisualizations: object[]) => {
  const tableStructure: TableStructureT = { 
    slides: slides.map((slide, idx) => { 
      const date = new Date(slide.created_at * 1000);
      return ({
        slideId: slide.id,
        casePath: `${basePath}${caseObj.pathInHierarchy}`,
        name: slide.local_id?.split('.')[-1] || slide.id,
        created: `${date.toLocaleString("cs")}`,
        visualizationConfig: slideVisualizations[idx] as VisualizationConfig
      })
    })
  }
  return tableStructure;
}

const CaseContent = ({ caseObj, basePath, fetchDelayed=false}: Props) => {
  const rootApi = useContext(RootApiContext);

  const getCaseContent = async () => {
    const slides = await getCaseSlides(rootApi!, caseObj.id)
    const rationaiApi = rootApi!.rationai;
    const visualizations = await Promise.all(slides.map(async (slide) => {
      const vis = await getSlideVisualizations(slide.id, rationaiApi)
      return vis;
    }))
    console.log(caseObj.examinations)
    
    return {slides: slides, visualizations: visualizations}
  };

  const { isPending, isError, data: caseContent } = useQuery({
    queryKey: [`case_${caseObj.id}_content`],
    queryFn: getCaseContent,
    enabled: !fetchDelayed && rootApi !== undefined,
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Unable to fetch data</div>
  }

  return (
    <div className='py-1 flex flex-col gap-2'>
      <JobsInfo caseId={caseObj.id} fetchDelayed={fetchDelayed}/>
      <Table tableStructure={getTableStructureFromCaseContents(caseObj, basePath, caseContent.slides, caseContent.visualizations)} showHeader={false} />
      {caseContent.slides.length === 0 && <div className='font-sans font-semibold text-slate-300 px-3 pt-1'>Case has no slides</div>}
    </div>
  )
}

export default CaseContent