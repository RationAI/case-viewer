'use client'
import React from "react";
import Image from "next/image";
import { AnnotationPresetT } from "@/type-definitions";
import APSelect from "./AnnotationPresetParts/APSelect";
import APColor from "./AnnotationPresetParts/APColor";
import APTextFields from "./AnnotationPresetParts/APTextFields";
import APNewField from "./AnnotationPresetParts/APNewField";
import { getRandomString } from "../../../../utils";

type Props = {
  annotationPreset: AnnotationPresetT;
  removePresetHandler: (id: string) => void;
  copyPresetHandler: (id: string) => void;
  editPresetHandler: (id: string, editedPreset: AnnotationPresetT) => void;
};

const AnnotationPreset = ({ annotationPreset, removePresetHandler, copyPresetHandler, editPresetHandler }: Props) => {
  const addNewFieldHandler = (name: string) => {
    const newKey = name + getRandomString(10);
    annotationPreset.meta[newKey] = { name: name, value: ''};
    editPresetHandler(annotationPreset.id, annotationPreset);
  }

  const removeFieldHandler = (key: string) => {
    delete annotationPreset.meta[key];
    editPresetHandler(annotationPreset.id, annotationPreset);
  }

  const editFieldInPreset = (key: string, value: string) => {
    // console.log(key)
    if (key === "factoryID" || key === "color") {
      // console.log('Old value: ' + annotationPreset[key])
      annotationPreset[key] = value;
      // console.log('New value: ' + annotationPreset[key])
    } else {
      // console.log('Old value: ' + annotationPreset.meta[key].value)
      annotationPreset.meta[key].value = value;
      // console.log('New value: ' + annotationPreset.meta[key].value)
    }

    editPresetHandler(annotationPreset.id, annotationPreset);
  }

  return (
    <div>
      <div className="border border-gray-400 rounded-lg p-2 border-dashed h-full">
        <form className="flex flex-col gap-[2px]">
          <div className="flex justify-between">
            <div className="flex gap-2">
              {/* annotation */}
              <APSelect annotationPreset={annotationPreset} editFieldInPreset={editFieldInPreset} />
              {/* color */}
              <APColor annotationPreset={annotationPreset} editFieldInPreset={editFieldInPreset} />
            </div>
            {/* copy/remove preset */}
            <div className="flex flex-row gap-1">
              <button title="Copy preset" type="button" onClick={() => copyPresetHandler(annotationPreset.id)} className="btn btn-sm btn-square border-gray-300 bg-gray-50 hover:bg-gray-200">
                <Image src="/svg/copy.svg" alt="Copy" height={33} width={33} />
              </button>
              <button title="Delete preset" type="button" onClick={() => removePresetHandler(annotationPreset.id)} className="btn btn-sm btn-square border-gray-300 bg-gray-50 hover:bg-gray-200">
                <Image src="/svg/cross.svg" alt="Remove" height={33} width={33} />
              </button>
            </div>
          </div>
          {/* category + custom fields */}
          <APTextFields annotationPreset={annotationPreset} removeTextField={removeFieldHandler} editFieldInPreset={editFieldInPreset} />          
        </form>
        <APNewField annotationPreset={annotationPreset} addTextField={addNewFieldHandler} />
      </div>
    </div>
  );
};

export default AnnotationPreset;
