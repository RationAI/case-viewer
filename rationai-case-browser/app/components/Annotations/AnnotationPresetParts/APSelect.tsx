import React from "react";
import { AnnotationPresetT } from "@/type-definitions";

type Props = {
  annotationPreset: AnnotationPresetT;
}

const annotationTypes: { [key: string]: string } = {
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  ruler: "Ruler",
  text: "Text",
};

const APSelect = ({ annotationPreset }: Props) => {
  return (
    <div>
      <label
        htmlFor={"annotation" + annotationPreset.id}
        className="form-label-custom"
      >
        Annotation
      </label>
      <select
        id={"annotation" + annotationPreset.id}
        className="form-input-custom"
        defaultValue={annotationTypes[annotationPreset.factoryID]}
      >
        {Object.entries(annotationTypes).map(([key, value]) => (
          <option key={key}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default APSelect;
