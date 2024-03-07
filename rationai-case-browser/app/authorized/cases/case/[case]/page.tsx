import React from 'react'
import Table from '../../../../components/Table/Table'
import { TableStructureT } from '@/type-definitions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getCaseInfo, getCaseSlides, getSlideThumbnailURL } from '@/app/utils/data';

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

const CasePage = async ({ params }: { params: { case: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const caseObj = await getCaseInfo(session, params.case)
  const slides = await getCaseSlides(session, params.case)

  const tableStructure: TableStructureT = { 
    name: caseObj.local_id || caseObj.id,
    slides: await Promise.all(slides.map(async (slide) => { 
      const previewURL = await getSlideThumbnailURL(session, slide.id)
      return ({
        uuid: slide.id,
        name: slide.local_id?.split('.')[-1] || slide.id,
        previewURL: previewURL,
        created: new Date(slide.created_at).toISOString(),
        metadata: {
          something: "something",
        },
        visualizations: [
          {
            name: "Pure background",
            visConfig: {    
              "params": {
              }, 
              "data": [slide.id],
              "background": [
                  {
                      "dataReference": 0,
                      "lossless": false,
                      "protocol": "path + \"?Deepzoom=\" + data + \".dzi\";"
                  }
              ],
              "visualizations": [],
          }
          }
        ]
      })
    }))
  }

  return (
    <div>
      <Table tableStructure={tableStructure}/>
    </div>
  )
}

export default CasePage