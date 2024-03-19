import React, { useState } from "react";
import { AnnotationPresetT } from "@/type-definitions";

type Props = {
  annotationPreset: AnnotationPresetT;
  editFieldInPreset: (key: string, value: string, name?: string) => void;
}

const APColor = ({ annotationPreset, editFieldInPreset }: Props) => {
  const [color, setColor] = useState(annotationPreset.color);

  const handleColorChange = (color: string) => {
    setColor(color);
    editFieldInPreset('color', color);
  }
  
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
        onChange={(e) => handleColorChange(e.target.value)}
      />
    </div>
  );
};

export default APColor;
