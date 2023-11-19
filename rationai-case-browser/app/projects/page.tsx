import React from 'react'
import Table from '../components/Projects/Table'
import { FolderStructure } from '@/type-definitions';

const currentDate = new Date();
const timestamp = currentDate.toISOString();

const exampleFolder: FolderStructure = {
  name: 'root',
  link: '/',
  subFolders: [
    {
      name: 'project1',
      link: '/project1'
    },
    {
      name: 'project2',
      link: '/project2'
    },
    {
      name: 'project3',
      link: '/project3'
    },
  ],
  files: [
    {
      uuid: 'dasdiasuidasodisnasodsa',
      path: '/report.pdf',
      format: 'pdf',
      created: timestamp,
      createdBy: 'John Doe',
      metadata: {
        something: 'something',
        dsasdasda: 'dasdsadasd',
      },
      masks: [
        {
          name: 'mask',
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

const rootPath = '/projects';

const UserFiles = () => {
  return (
    <div>
      <Table rootPath={rootPath} folderStructure={exampleFolder}/>
    </div>
  )
}

export default UserFiles