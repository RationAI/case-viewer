import { FormNumberFieldT } from '@/type-definitions';
import React from 'react';

type Props = {
  field: FormNumberFieldT;
};

const FormNumberField = ({ field }: Props) => {
  return (
    <div className="flex-1">
      <label htmlFor={field.fieldID} className="form-label-custom">
        {field.label}
      </label>
      <input
        type="number"
        id={field.fieldID}
        className="form-input-custom"
        min={field.minValue}
        max={field.maxValue}
        step={field.step}
        defaultValue={field.defaultValue}
      />
    </div>
  );
};

export default FormNumberField;
