import React from 'react'
import AnnotationPresetGrid from '../components/Annotations/AnnotationPresetGrid'

const AnnotationsPage = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='font-sans font-semibold text-slate-500 text-xl'>Annotations</div>
      <AnnotationPresetGrid />
    </div>
  )
}

export default AnnotationsPage