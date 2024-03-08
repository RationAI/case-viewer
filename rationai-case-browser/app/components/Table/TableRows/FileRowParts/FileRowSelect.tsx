import React from "react";

type Props = {
  options: string[];
}

const FileRowSelect = ({ options }: Props) => {
  return (
    <select defaultValue={options[0]} className="select select-bordered select-xs w-full max-w-xs" id="visName" >
      {options.map((option) => {
        return (
        <option key={option}>
          {option}
        </option>
        )
      })}
    </select>
  );
};

export default FileRowSelect;
