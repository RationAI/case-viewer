import React from 'react'
import Image from "next/image";

type Props = {
  jobName?: string,
  jobDescription?: string,
}

const ProcessingVis = ({jobName, jobDescription}: Props) => {
  return (
    <div className="group relative flex justify-center">
      <button
        type="button"
        onClick={() => {}}
        className="btn btn-sm btn-square h-10 w-10 btn-disabled !bg-lime-100 !border-lime-300 animate-pulse"
      >
        <Image className='animate-spin opacity-30' src="/svg/loader2.svg" alt="Slide details" height={20} width={20} />
      </button>
      <div className="flex flex-col items-center w-max absolute bottom-11 scale-0 transition-all rounded border border-gray-500 bg-white dark:bg-dark  p-[2px] group-hover:scale-100">
        <span className='text-xs'>{jobName || "Job"}</span>
        <span className='text-xs text-lime-500 font-semibold animate-pulse'>processing</span>
        {jobDescription && <span className='text-xs text-slate-500'>{jobDescription}</span>}
      </div>
    </div>
  )
}

export default ProcessingVis