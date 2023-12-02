'use client'
import React, { useState } from "react";
import Image from "next/image";
import { AnnotationPresetT } from "@/type-definitions";
import APSelect from "./AnnotationPresetParts/APSelect";
import APColor from "./AnnotationPresetParts/APColor";
import APTextFields from "./AnnotationPresetParts/APTextFields";
import APNewField from "./AnnotationPresetParts/APNewField";
import { getRandomString } from "../../utils";

type Props = {
  annotationPreset: AnnotationPresetT;
  removePresetHandler: (id: number) => void;
  editPresetHandler: (id: number, editedPreset: AnnotationPresetT) => void;
};

const AnnotationPreset = ({ annotationPreset, removePresetHandler, editPresetHandler }: Props) => {
  const [color, setColor] = useState(annotationPreset.color);

  const addNewFieldHandler = (name: string) => {
    const newKey = name + getRandomString(10);
    annotationPreset.meta[newKey] = { name: name, value: ''};
    editPresetHandler(annotationPreset.id, annotationPreset);
  }

  const removeFieldHandler = (key: string) => {
    delete annotationPreset.meta[key];
    editPresetHandler(annotationPreset.id, annotationPreset);
  }

  return (
    <div>
      <div className="border border-gray-400 rounded-lg p-2 border-dashed h-full">
        <form className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-2">
              {/* annotation */}
              <APSelect annotationPreset={annotationPreset} />
              {/* color */}
              <APColor annotationPreset={annotationPreset} color={color} colorChangeHandler={setColor} />
            </div>
            {/* remove preset */}
            <div>
              <button onClick={() => removePresetHandler(annotationPreset.id)} className="btn btn-sm btn-square border-gray-300 bg-gray-50 hover:bg-gray-200">
                <Image src="/svg/cross.svg" alt="Remove" height={33} width={33} />
              </button>
            </div>
          </div>
          {/* category + custom fields */}
          <APTextFields annotationPreset={annotationPreset} removeTextField={removeFieldHandler} />          
        </form>
        <APNewField annotationPreset={annotationPreset} addTextField={addNewFieldHandler} />
      </div>
    </div>
  );
};

export default AnnotationPreset;
