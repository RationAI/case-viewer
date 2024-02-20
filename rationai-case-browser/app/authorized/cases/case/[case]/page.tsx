import React from 'react'
import Table from '../../../../components/Table/Table'
import { TableStructureT } from '@/type-definitions';

const currentDate = new Date();
const timestamp = currentDate.toISOString();

const exampleFolder: TableStructureT = {
  name: 'folder',
  slides: [
    {
      uuid: 'dasdiasuidasodisnasodsa',
      name: 'report.pdf',
      path: '/report.pdf',
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
}

const ProjectFiles = ({ params }: { params: { user: string, case: string } }) => {
  const rootPathOfCase = `/authorized/${params.user}/${params.case}`;

  // TODO probably set caseId in some global state, for the sake of links in Navbar

  // TODO here should be a call to get contents of CASE

  return (
    <div>
      <div>Case ID: {params.case}</div>
      <Table tableStructure={exampleFolder}/>
    </div>
  )
}

export default ProjectFiles