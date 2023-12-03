import React from 'react'
import FileBrowseInput from '../components/Upload/FileBrowseInput'
import Form from '../components/Upload/Form/Form'
import { FormConfigT } from '@/type-definitions'

const formConfigExample: FormConfigT = {
  title: "Title",
  description: "saasdnasndnaiosndionsaond inaiondnsadn naicnsadnas iainasndisa inaionias niadasdsa d sad asd asd a s dasdsadasd dasdasdas da",
  rows: [
    {
      fields: [
        {
          type: 'select',
          fieldID: '0',
          label: 'Select',
          defaultValue: 'one',
          description: 'inionsdnasndnakasmdas',
          options: ['one', 'two', 'three', 'four', 'five', 'six']
        },
        {
          type: 'text',
          fieldID: '1',
          label: 'Text',
          defaultValue: '',
        }
      ]
    },
    {
      fields: [
        {
          type: 'text',
          fieldID: '2',
          label: 'Text',
          defaultValue: '',
        }
      ]
    },
    {
      fields: [
        {
          type: 'text',
          fieldID: '2',
          label: 'Text',
          defaultValue: '',
        }
      ]
    },
    {
      fields: [
        {
          type: 'select',
          fieldID: '0',
          label: 'Select',
          defaultValue: 'one',
          description: 'inionsdnasndnakasmdas',
          options: ['one', 'two', 'three', 'four', 'five', 'six']
        },
      ]
    },
  ],
}

const UploadPage = () => {
  return (
    <div className='w-full flex flex-col items-center gap-2'>
      <div className='font-sans font-semibold text-slate-500 text-xl'>Upload to project</div>
      <div className='flex flex-row w-[95%] gap-2'>
        <div className='w-1/3'>
          <FileBrowseInput />
        </div>
        <div className='w-2/3'>
          <Form config={formConfigExample} />
        </div>
      </div>
    </div>
  )
}

export default UploadPage