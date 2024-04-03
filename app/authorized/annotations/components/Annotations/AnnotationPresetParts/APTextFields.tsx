import React from "react";
import Image from "next/image";
import { AnnotPreset } from "@/EmpationAPI/src/v3/extensions/types/annot-preset";

type Props = {
  annotationPreset: AnnotPreset;
  removeTextField: (key: string) => void;
  editFieldInPreset: (key: string, value: string, name?: string) => void;
};

const APTextFields = ({
  annotationPreset,
  removeTextField,
  editFieldInPreset,
}: Props) => {
  return (
    <>
      {Object.entries(annotationPreset.meta).map(([key, { name, value }]) => {
        return (
          <div key={key}>
            <label
              htmlFor={"key" + annotationPreset.id}
              className="form-label-custom"
            >
              {name}
            </label>
            <div className="relative">
              {key != "category" && (
                <div className="absolute inset-y-0 end-0 flex items-center pe-1">
                  <button
                    title="Remove field"
                    onClick={() => removeTextField(key)}
                    className="btn btn-xs btn-square border-gray-50 bg-gray-50 hover:bg-gray-200"
                  >
                    <Image
                      src="/svg/trash.svg"
                      alt="Remove"
                      height={17}
                      width={17}
                    />
                  </button>
                </div>
              )}
              <input
                type="text"
                id={"key" + annotationPreset.id}
                onChange={(e) => editFieldInPreset(key, e.target.value, name)}
                className={
                  "form-input-custom" + (key != "category" ? " pr-8" : "")
                }
                defaultValue={value}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default APTextFields;
