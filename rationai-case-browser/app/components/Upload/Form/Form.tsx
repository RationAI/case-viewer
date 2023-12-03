import { FormConfigT, FormSelectFieldT, FormTextFieldT } from '@/type-definitions';
import React from 'react'
import FormSelectField from './FormFields/FormSelectField';
import FormTextField from './FormFields/FormTextField';

type Props = {
  config: FormConfigT;
}

const Form = ({config}: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      {config.title && (
        <div className='font-sans font-semibold text-slate-500 text-md'>{config.title}</div>
      )}
      {config.description && (
        <div className='font-sans font-normal text-slate-700 text-sm'>{config.description}</div>
      )}
      <form action="" className="flex flex-col gap-2">
        {config.rows.map((row) => (
          <div key={row.fields[0].fieldID + "row"} className='flex flex-row justify-between items-center gap-2'>
            {row.fields.map((field) => {
              if (field.type === 'select') {
                return <FormSelectField key={field.fieldID} field={field as FormSelectFieldT} />
              } else {
                return <FormTextField key={field.fieldID} field={field as FormTextFieldT}/>
              }
            })}
          </div>
        ))}
      </form>
    </div>
  )
}

export default Form