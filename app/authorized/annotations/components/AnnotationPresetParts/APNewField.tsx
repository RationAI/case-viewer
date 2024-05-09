'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { AnnotPreset } from '@/EmpationAPI/src/v3/extensions/types/annot-preset';

type Props = {
  annotationPreset: AnnotPreset;
  addTextField: (name: string) => void;
};

const APNewField = ({ annotationPreset, addTextField }: Props) => {
  const [newFieldContent, setNewFieldContent] = useState('');
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
        className="flex items-center justify-start gap-2"
      >
        <input
          onChange={(e) => setNewFieldContent(e.target.value)}
          onFocus={() => setEmptyFieldAlert(false)}
          type="text"
          id={'newField' + annotationPreset.id}
          value={newFieldContent}
          className={
            'form-input-custom' +
            (emptyFieldAlert
              ? ' border-red-500 bg-red-50 placeholder-red-700 dark:bg-red-200'
              : '')
          }
          placeholder={emptyFieldAlert ? 'Please input name' : 'New field'}
        />
        <button
          title="Add new field"
          type="submit"
          className="btn btn-square btn-sm border-0 bg-inherit hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Image
            className="dark:svg-filter-dark"
            src="/svg/add-row.svg"
            alt="Add"
            height={33}
            width={33}
          />
        </button>
      </form>
    </div>
  );
};

export default APNewField;
