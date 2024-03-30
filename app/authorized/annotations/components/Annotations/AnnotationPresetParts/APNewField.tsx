'use client'
import React, { useState } from "react";
import Image from "next/image";
import { AnnotationPresetT } from "@/type-definitions";

type Props = {
  annotationPreset: AnnotationPresetT;
  addTextField: (name: string) => void;
};

const APNewField = ({ annotationPreset, addTextField }: Props) => {
  const [newFieldContent, setNewFieldContent] = useState("");
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newFieldContent === '') {
      setEmptyFieldAlert(true);
    } else {
      addTextField(newFieldContent);
      setNewFieldContent('');
    }
  };

  return (
    <div className="pt-2">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center justify-start"
      >
        <input
          onChange={(e) => setNewFieldContent(e.target.value)}
          onFocus={() => setEmptyFieldAlert(false)}
          type="text"
          id={"newField" + annotationPreset.id}
          value={newFieldContent}
          className={"form-input-custom" + (emptyFieldAlert ? " placeholder-red-700 border-red-500 bg-red-50" : "")}
          placeholder={emptyFieldAlert ? "Please input name" : "New field"}
        />
        <button
          title="Add new field"
          type="submit"
          className="btn btn-sm btn-square border-base-100 bg-base-100 hover:bg-gray-200"
        >
          <Image src="/svg/add-row.svg" alt="Add" height={33} width={33} />
        </button>
      </form>
    </div>
  );
};

export default APNewField;
