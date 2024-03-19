'use client'

import React from 'react'

const AnnotationButtons = () => {

  const handleRevertClick = () => {}

  const handleOverwriteClick = () => {}

  return (
    <div className='flex flex-row flex-wrap gap-2 justify-end'>
      <button onClick={handleRevertClick} className="btn btn-sm btn-outline font-sans">Revert to project presets</button>
      <button onClick={handleOverwriteClick} className="btn btn-sm btn-outline btn-error font-sans">! Save for project !</button>
    </div>
  )
}

export default AnnotationButtons