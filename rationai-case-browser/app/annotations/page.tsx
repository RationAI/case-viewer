import React from 'react'
import AnnotationPresetGrid from '../components/Annotations/AnnotationPresetGrid'
import AnnotationButtons from '../components/Annotations/AnnotationButtons'

const AnnotationsPage = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex flex-col items-center gap-2 md:w-5/6 lg:w-9/12'>
        <div className='w-full flex justify-between items-center'>
          <div className='font-sans font-semibold text-slate-500 text-xl pl-1'>Annotations presets</div>
          <AnnotationButtons />
        </div>
        <AnnotationPresetGrid />
      </div>
    </div>
  )
}

export default AnnotationsPage