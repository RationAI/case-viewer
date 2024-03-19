'use client'

import React, { useEffect, useState } from 'react'
import Table from '../../../components/Table/Table'
import { TableStructureT } from '@/type-definitions';
import { Session } from 'next-auth';
import { getCaseInfo, getCaseSlides, getRationAIApi, getSlideThumbnailURL, getSlideVisualizations } from '@/app/utils/data';
import { useSession } from 'next-auth/react';
import { Case } from '@/EmpationAPI/src/v3/root/types/case';
import { Slide } from '@/EmpationAPI/src/v3/root/types/slide';

type Props = {
  caseId: string;
}

const getTableStructureFromCaseContents = (caseInfo: Case, slides: Slide[], thumbnailUrls: (string | undefined)[], slideVisualizations: object[]) => {
  const tableStructure: TableStructureT = { 
    name: caseInfo.local_id || caseInfo.id,
    slides: slides.map((slide, idx) => { 
      return ({
        uuid: slide.id,
        name: slide.local_id?.split('.')[-1] || slide.id,
        previewURL: thumbnailUrls[idx],
        created: new Date(slide.created_at).toISOString(),
        metadata: {
          something: "something",
        },
        visualizations: [
          {
            name: "Pure background",
            visConfig: {    
              "data": [slide.id],
              "background": [
                  {
                      "dataReference": 0,
                      "lossless": false,
                  }
              ],
            }
          }
        ]
      })
    })
  }
  return tableStructure;
}

/* const exampleFolder: TableStructureT = {
  name: 'folder',
  slides: [
    {
      uuid: 'dasdiasuidasodisnasodsa',
      name: 'report.pdf',
      previewURL: '/file_icons/image_file.svg',
      format: 'pdf',
      created: timestamp,
      createdBy: 'John Doe',
      metadata: {
        something: 'something',
        dsasdasda: 'dasdsadasd',
      },
      masks: [
        {
          name: 'mask1',
          imageLink: '/file_icons/image_file.svg',
        },
        {
          name: 'mask2',
          imageLink: '/file_icons/image_file.svg',
        },
        {
          name: 'mask3sadasdasdasdsadasdas',
          imageLink: '/file_icons/image_file.svg',
        },
        {
          name: 'mask4',
          imageLink: '/file_icons/image_file.svg',
        },
        {
          name: 'mask5',
          imageLink: '/file_icons/image_file.svg',
        },
        {
          name: 'mask6',
          imageLink: '/file_icons/image_file.svg',
        },
        {
          name: 'mask7',
          imageLink: '/file_icons/image_file.svg',
        },
        {
          name: 'mask8',
          imageLink: '/file_icons/image_file.svg',
        },
        {
          name: 'mask9',
          imageLink: '/file_icons/image_file.svg',
        },
        {
          name: 'mask10',
          imageLink: '/file_icons/image_file.svg',
        },
      ],
      annotations: [
        {
          name: 'mask',
          imageLink: '/file_icons/image_file.svg',
        },
      ]
    }
  ]
} */

const CaseContent = ({ caseId }: Props) => {
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

      /* const rationaiApi = await getRationAIApi(session)

      const visualizations = await Promise.all(slides.map(async (slide) => {
        const vis = rationaiApi.globalStorage.wsiMetadata.getVisualizations(slide.id)
        return vis;
      }))

      setSlideVisualizations(visualizations) */
    };

    if (session?.accessToken) {
      getCaseContent(session);
    }
  }, [caseId, session, session?.accessToken])

  if (caseInfo && caseSlides && thumbnailUrls && slideVisualizations) {
    return (
      <div>
        <Table tableStructure={getTableStructureFromCaseContents(caseInfo, caseSlides, thumbnailUrls, slideVisualizations)}/>
      </div>
    )
  }

  return (
    <div>Loading...</div>
  )
}

export default CaseContent