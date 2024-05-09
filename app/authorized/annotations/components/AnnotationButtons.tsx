'use client';

import React from 'react';

type Props = {
  handleRevertClick: () => void;
  handleSaveClick: () => void;
};

const AnnotationButtons = ({ handleRevertClick, handleSaveClick }: Props) => {
  return (
    <div className="flex flex-row flex-wrap justify-end gap-2">
      <button
        onClick={handleRevertClick}
        className="btn btn-outline btn-sm font-sans"
      >
        Revert to global presets
      </button>
      <button
        onClick={handleSaveClick}
        className="btn btn-error btn-outline btn-sm font-sans"
      >
        !! Save globally !!
      </button>
    </div>
  );
};

export default AnnotationButtons;
