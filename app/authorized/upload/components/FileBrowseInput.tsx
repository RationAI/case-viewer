import React from 'react';

const FileBrowseInput = () => {
  return (
    <div className="w-full rounded-lg border border-dashed border-gray-900 p-2">
      <input
        type="file"
        //directory=""
        //webkitdirectory=""
        className="file-input file-input-ghost file-input-xs h-16 w-full hover:bg-gray-100"
      />
    </div>
  );
};

export default FileBrowseInput;
