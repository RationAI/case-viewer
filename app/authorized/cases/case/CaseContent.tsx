'use client'

import React, { useEffect, useState } from 'react'
import Table from '../components/Table/Table'
import { TableStructureT, VisualizationConfig } from '@/type-definitions';
import { getCaseInfo, getCaseSlides, getRationAIApi, getSlideVisualizations } from '@/app/utils/data';
import { getSession } from 'next-auth/react';
import { Case } from '@/EmpationAPI/src/v3/root/types/case';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';

type Props = {
  caseId: string;
  caseHierPath: string
  showCaseName: boolean;
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

const CaseContent = ({ caseId, caseHierPath, showCaseName }: Props) => {
  const [caseInfo, setCaseInfo] = useState<Case | undefined>();
  const [caseSlides, setCaseSlides] = useState<Slide[] | undefined>();
  const [slideVisualizations, setSlideVisualizations] = useState<(object[])>([])

  useEffect(() => {
    const getCaseContent = async () => {
      const session = await getSession()
      if (session && session.accessToken) {
        const caseInfo = await getCaseInfo(session, caseId)
        const slides = await getCaseSlides(session, caseId)
        setCaseInfo(caseInfo);
        setCaseSlides(slides);

        const rationaiApi = await getRationAIApi(session)

        const visualizations = await Promise.all(slides.map(async (slide) => {
          const vis = await getSlideVisualizations(slide.id, rationaiApi)
          return vis;
        }))

        setSlideVisualizations(visualizations)
      }
    };

    getCaseContent();
  }, [caseId])

  if (caseInfo && caseSlides && slideVisualizations) {
    return (
      <div>
        <Table tableStructure={getTableStructureFromCaseContents(caseInfo, caseHierPath, caseSlides, slideVisualizations, showCaseName)}/>
        {caseSlides.length === 0 && <div className='font-sans font-semibold text-slate-300 px-3 pt-1'>Case has no slides</div>}
      </div>
    )
  }

  return (
    <div>Loading...</div>
  )
}

export default CaseContent