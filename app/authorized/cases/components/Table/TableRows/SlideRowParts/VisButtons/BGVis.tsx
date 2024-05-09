import React from 'react'
import { markVisited } from '../SlideVisualizations'

type Props = {
  tooltipText?: string,
  href: string,
  onClick: () => void,
}

const BGVis = ({tooltipText, href, onClick}: Props) => {
  return (
    <a href={href} className="group relative flex justify-center" onClick={(e) => markVisited(e, href)}>
      <div className="group relative flex justify-center">
        <button
          type="button"
          onClick={onClick}
          className="btn btn-sm btn-square h-10 w-10 group-visited:text-neutral-800 group-visited:bg-purple-200 group-visited:border-purple-400 border-gray-300 hover:border-gray-300 bg-gray-50 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-600"
        >
          WSI
        </button>
        {tooltipText &&
          <div className="w-max absolute bottom-11 scale-0 transition-all rounded border border-gray-500 bg-white dark:bg-dark  p-[2px] group-hover:scale-100">
            <span className='text-xs'>{tooltipText}</span>
          </div>
        }
      </div>
    </a>
  )
}

export default BGVis