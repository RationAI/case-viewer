'use client'

import React from 'react'

type Props = {
  handleRevertClick: () => void;
  handleSaveClick: () => void;
}

const AnnotationButtons = ({handleRevertClick, handleSaveClick}: Props) => {
  return (
    <div className='flex flex-row flex-wrap gap-2 justify-end'>
      <button onClick={handleRevertClick} className="btn btn-sm btn-outline font-sans">Revert to project presets</button>
      <button onClick={handleSaveClick} className="btn btn-sm btn-outline btn-error font-sans">! Save globally !</button>
    </div>
  )
}

export default AnnotationButtons