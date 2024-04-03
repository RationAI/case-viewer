import { AnnotPreset } from "@/EmpationAPI/src/v3/extensions/types/annot-preset";
import React, { useState } from "react";

type Props = {
  annotationPreset: AnnotPreset;
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
        className="form-input-custom min-h-8"
        type="color"
        value={color}
        onChange={(e) => handleColorChange(e.target.value)}
      />
    </div>
  );
};

export default APColor;
