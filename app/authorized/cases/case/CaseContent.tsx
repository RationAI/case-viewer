'use client'

import React, { useContext, useEffect, useState } from 'react'
import Table from '../components/Table/Table'
import { TableStructureT, VisualizationConfig } from '@/type-definitions';
import { getCaseSlides, getSlideVisualizations } from '@/app/utils/data';
import { Case } from '@/EmpationAPI/src/v3/root/types/case';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';
import { CaseH } from '@/EmpationAPI/src/v3/extensions/types/case-h';
import { RootApiContext } from '../../[[...pathParts]]/AuthorizedLayout';

type Props = {
  caseObj: CaseH;
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

const CaseContent = ({ caseObj, showCaseName }: Props) => {
  const rootApi = useContext(RootApiContext);
  const [caseSlides, setCaseSlides] = useState<Slide[] | undefined>();
  const [slideVisualizations, setSlideVisualizations] = useState<(object[])>([])

  useEffect(() => {
    const getCaseContent = async () => {
      const slides = await getCaseSlides(rootApi, caseObj.id)
      setCaseSlides(slides);

      const rationaiApi = rootApi.rationai;

      const visualizations = await Promise.all(slides.map(async (slide) => {
        const vis = await getSlideVisualizations(slide.id, rationaiApi)
        return vis;
      }))

      setSlideVisualizations(visualizations)
    };

    getCaseContent();
  }, [caseObj, rootApi])

  if (caseObj && caseSlides && slideVisualizations) {
    return (
      <div>
        <Table tableStructure={getTableStructureFromCaseContents(caseObj, caseObj.pathInHierarchy, caseSlides, slideVisualizations, showCaseName)}/>
        {caseSlides.length === 0 && <div className='font-sans font-semibold text-slate-300 px-3 pt-1'>Case has no slides</div>}
      </div>
    )
  }

  return (
    <div>Loading...</div>
  )
}

export default CaseContent