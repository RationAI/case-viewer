import React from 'react'

const FileBrowseInput = () => {
  return (
    <div className='border border-gray-400 rounded-lg p-2 border-dashed'>
      <input type="file" className="file-input file-input-ghost file-input-xs h-16 w-full max-w-xs border-gray-300 bg-gray-50 hover:bg-gray-200" />
    </div>
  )
}

export default FileBrowseInput