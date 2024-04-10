import React from 'react'
import Image from "next/image";

const markVisVisited = (event, href: string) => {
  event.preventDefault();
  if (history.replaceState) {
    const current_url = window.location.href;
    history.replaceState({},'',href);
    history.replaceState({},'',current_url);
  }
}

type Props = {
  jobName?: string,
  jobDescription?: string,
  href: string,
  onClick: () => void,
}

const AvailableVis = ({jobName, jobDescription, href, onClick}: Props) => {
  return (
    <a href={href} className="group relative flex justify-center" onClick={(e) => markVisVisited(e, href)}>
      <button
        type="button"
        onClick={onClick}
        className="btn btn-sm btn-square h-10 w-10 group-visited:bg-purple-200 group-visited:border-purple-400 bg-green-100 hover:bg-green-100 border-green-600 hover:border-green-600"
      >
        <Image className='' src="/svg/layer.svg" alt="Slide details" height={25} width={25} />
      </button>
      <div className="w-max flex flex-col items-center absolute bottom-11 scale-0 transition-all rounded border border-gray-500 bg-white p-[2px] group-hover:scale-100">
        <span className='text-xs'>{jobName|| "Job"}</span>
        <span className='text-xs text-green-500 font-semibold'>completed</span>
        {jobDescription && <span>{jobDescription}</span>}
      </div>
    </a>
  )
}

export default AvailableVis