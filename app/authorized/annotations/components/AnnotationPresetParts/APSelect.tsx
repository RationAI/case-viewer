import React from "react";
import { AnnotPreset } from "@/EmpationAPI/src/v3/extensions/types/annot-preset";

type Props = {
  annotationPreset: AnnotPreset;
  editFieldInPreset: (key: string, value: string, name?: string) => void;
};

const annotationTypes: { [key: string]: string } = {
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  ruler: "Ruler",
  text: "Text",
};

const APSelect = ({ annotationPreset, editFieldInPreset }: Props) => {

  const handleSelectEdit = (selectValue: string) => {
    const keyOfSelectedValue = Object.keys(annotationTypes).find((key) => annotationTypes[key] === selectValue) ?? 'polygon';
    editFieldInPreset('factoryID', keyOfSelectedValue)
  }

  return (
    <div>
      <label
        htmlFor={"factoryID" + annotationPreset.id}
        className="form-label-custom"
      >
        Annotation
      </label>
      <select
        id={"factoryID" + annotationPreset.id}
        className="form-input-custom"
        defaultValue={annotationTypes[annotationPreset.factoryID]}
        onChange={(e) => handleSelectEdit(e.target.value)}
      >
        {Object.entries(annotationTypes).map(([key, value]) => (
          <option key={key}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default APSelect;
