import React from "react";
import { AnnotationPresetT } from "@/type-definitions";

type Props = {
  annotationPreset: AnnotationPresetT;
  color: string;
  colorChangeHandler: (value: string) => void;
}

const APColor = ({ annotationPreset, color, colorChangeHandler }: Props) => {
  return (
    <div>
      <label
        htmlFor={"nativeColorPicker1" + annotationPreset.id}
        className="form-label-custom"
      >
        Color
      </label>
      <input
        id={"nativeColorPicker1" + annotationPreset.id}
        className="form-input-custom"
        type="color"
        value={color}
        onChange={(e) => colorChangeHandler(e.target.value)}
      />
    </div>
  );
};

export default APColor;
