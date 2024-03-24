'use client'

import React, { useEffect, useState } from 'react'
import Table from '../components/Table/Table'
import { TableStructureT, VisualizationConfig } from '@/type-definitions';
import { Session } from 'next-auth';
import { getCaseInfo, getCaseSlides, getRationAIApi, getSlideThumbnailURL, getSlideVisualizations } from '@/app/utils/data';
import { useSession } from 'next-auth/react';
import { Case } from '@/EmpationAPI/src/v3/root/types/case';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';

type Props = {
  caseId: string;
  showCaseName: boolean;
}

const getTableStructureFromCaseContents = (caseInfo: Case, slides: Slide[], thumbnailUrls: (string | undefined)[], slideVisualizations: object[], showCaseName: boolean) => {
  const tableStructure: TableStructureT = { 
    name: showCaseName ? (caseInfo.local_id || caseInfo.id) : undefined,
    slides: slides.map((slide, idx) => { 
      return ({
        uuid: slide.id,
        name: slide.local_id?.split('.')[-1] || slide.id,
        previewURL: thumbnailUrls[idx],
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

const CaseContent = ({ caseId, showCaseName }: Props) => {
  const { data: session } = useSession();

  const [caseInfo, setCaseInfo] = useState<Case | undefined>();
  const [caseSlides, setCaseSlides] = useState<Slide[] | undefined>();
  const [thumbnailUrls, setThumbnailUrls] = useState<(string | undefined)[]>([]);
  const [slideVisualizations, setSlideVisualizations] = useState<(object[])>([])

  useEffect(() => {
    const getCaseContent = async (session: Session) => {
      const caseObj = await getCaseInfo(session, caseId)
      const slides = await getCaseSlides(session, caseId)
      setCaseInfo(caseObj);
      setCaseSlides(slides);

      const slideThumbnails = await Promise.all(slides.map(async (slide) => {
        const previewURL = await getSlideThumbnailURL(session, slide.id)
        return previewURL;
      }))

      setThumbnailUrls(slideThumbnails)

      const rationaiApi = await getRationAIApi(session)

      const visualizations = await Promise.all(slides.map(async (slide) => {
        const vis = await getSlideVisualizations(slide.id, rationaiApi)
        return vis;
      }))

      setSlideVisualizations(visualizations)
    };

    if (session?.accessToken) {
      getCaseContent(session);
    }
  }, [caseId, session, session?.accessToken])

  if (caseInfo && caseSlides && thumbnailUrls && slideVisualizations) {
    return (
      <div>
        <Table tableStructure={getTableStructureFromCaseContents(caseInfo, caseSlides, thumbnailUrls, slideVisualizations, showCaseName)}/>
      </div>
    )
  }

  return (
    <div>Loading...</div>
  )
}

export default CaseContent