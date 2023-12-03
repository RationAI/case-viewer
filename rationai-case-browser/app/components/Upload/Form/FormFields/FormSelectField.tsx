import { FormSelectFieldT } from "@/type-definitions";
import React from "react";

type Props = {
  field: FormSelectFieldT;
};

const FormSelectField = ({ field }: Props) => {
  return (
    <div>
      <label
        htmlFor={field.fieldID}
        className="form-label-custom"
      >
        {field.label}
      </label>
      <select
        id={field.fieldID}
        className="form-input-custom"
        defaultValue={field.defaultValue}
      >
        {field.options.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default FormSelectField;
