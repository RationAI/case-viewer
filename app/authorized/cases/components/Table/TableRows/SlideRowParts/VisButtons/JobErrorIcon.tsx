import React from 'react'
import Image from "next/image";

const JobErrorIcon = () => {
  return (
    <div className="group relative flex justify-center">
      <Image className='svg-filter-red' src="/svg/error.svg" alt="Job error" height={18} width={18} />
      <div className="w-max flex flex-col items-center absolute bottom-8 scale-0 transition-all rounded border border-gray-500 bg-white dark:bg-dark  p-[2px] group-hover:scale-100">
        <span className='text-xs'>Slide has jobs that ended with</span>
        <span className='text-xs text-red-700 font-semibold'>error</span>
      </div>
    </div>
  )
}

export default JobErrorIcon