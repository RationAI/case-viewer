import React from 'react'

const FileBrowseInput = () => {
  return (
    <div className='w-full border border-gray-900 rounded-lg p-2 border-dashed'>
      {/* @ts-expect-error typescript doesnt support some attributes for input field */}
      <input type="file" directory="" webkitdirectory="" className="file-input file-input-ghost file-input-xs h-16 w-full hover:bg-gray-100"/>
    </div>
  )
}

export default FileBrowseInput