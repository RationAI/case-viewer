import { FormTextFieldT } from '@/type-definitions';
import React from 'react';

type Props = {
  field: FormTextFieldT;
};

const FormTextField = ({ field }: Props) => {
  return (
    <div className="flex-1">
      <label htmlFor={field.fieldID} className="form-label-custom">
        {field.label}
      </label>
      <input
        type="text"
        id={field.fieldID}
        className="form-input-custom"
        defaultValue={field.defaultValue}
      />
    </div>
  );
};

export default FormTextField;
