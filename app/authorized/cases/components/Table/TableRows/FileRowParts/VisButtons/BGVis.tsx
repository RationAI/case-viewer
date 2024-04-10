import React from 'react'

type Props = {
  tooltipText?: string,
  onClick: () => void,
}

const BGVis = ({tooltipText, onClick}: Props) => {
  return (
    <div className="group relative flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="btn btn-sm btn-square h-10 w-10 border-gray-300 bg-gray-50 hover:bg-gray-50"
      >
        bg
      </button>
      <div className="w-max absolute bottom-11 scale-0 transition-all rounded border border-gray-500 bg-white p-[2px] group-hover:scale-100">
        <span className='text-xs'>{tooltipText}</span>
      </div>
    </div>
  )
}

export default BGVis