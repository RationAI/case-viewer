import React from "react";

type Props = {
  options: string[];
}

const FileRowSelect = ({ options }: Props) => {
  return (
    <select className="select select-bordered select-xs w-full max-w-xs">
      {options.map((option, idx) => {
        return (
        <option key={option} selected={idx === 0}>
          {option}
        </option>
        )
      })}
    </select>
  );
};

export default FileRowSelect;
