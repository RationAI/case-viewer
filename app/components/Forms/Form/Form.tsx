'use client';
import {
  FormConfigT,
  FormNumberFieldT,
  FormSelectFieldT,
  FormTextFieldT,
} from '@/type-definitions';
import React from 'react';
import FormSelectField from './FormFields/FormSelectField';
import FormTextField from './FormFields/FormTextField';
import FormNumberField from './FormFields/FormNumberField';

type Props = {
  formID: string;
  config: FormConfigT;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ formID, config, onSubmit }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {config.title && (
        <div className="text-md font-sans font-semibold text-slate-500">
          {config.title}
        </div>
      )}
      {config.description && (
        <div className="font-sans text-sm font-normal text-slate-700">
          {config.description}
        </div>
      )}
      <form id={formID} className="flex flex-col gap-2" onSubmit={onSubmit}>
        {config.rows.map((row) => {
          if (row.fields.length > 0) {
            return (
              <div
                key={row.fields[0].fieldID + 'row'}
                className="flex flex-row items-center justify-between gap-2"
              >
                {row.fields.map((field) => {
                  if (field.type === 'select') {
                    return (
                      <FormSelectField
                        key={field.fieldID}
                        field={field as FormSelectFieldT}
                      />
                    );
                  } else if (field.type === 'number') {
                    return (
                      <FormNumberField
                        key={field.fieldID}
                        field={field as FormNumberFieldT}
                      />
                    );
                  } else {
                    return (
                      <FormTextField
                        key={field.fieldID}
                        field={field as FormTextFieldT}
                      />
                    );
                  }
                })}
              </div>
            );
          }
        })}
      </form>
    </div>
  );
};

export default Form;
