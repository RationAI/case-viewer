'use client';

import React, { useState } from 'react';

type Props = {
  formID: string;
};

const UploadButtonsAndProgress = ({ formID }: Props) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [uploadInProgress, setUploadInProgress] = useState(false);

  const handleUploadClick = () => {
    setStatusMessage('Upload in progress...');
    setUploadInProgress(true);
  };

  const handleMonitorClick = () => {};

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex flex-row flex-wrap items-center justify-between gap-2">
        <div className="flex flex-row gap-2">
          <button
            //type="submit"
            //form={formID}
            onClick={handleUploadClick}
            className="btn btn-outline btn-sm font-sans"
          >
            Upload
          </button>
          <button
            //type="submit"
            //form={formID}
            onClick={handleMonitorClick}
            className="btn btn-error btn-outline btn-sm font-sans"
          >
            Monitor
          </button>
        </div>
        {uploadInProgress && (
          <div className="h-3 w-1/2 overflow-hidden rounded-full bg-gray-200">
            <div className="h-3 w-3/4 animate-pulse rounded-full bg-gradient-to-r from-base-content to-error"></div>
          </div>
        )}
      </div>
      {uploadInProgress && (
        <div className="flex flex-row justify-end">
          <div className="pr-1 font-sans">{statusMessage}</div>
        </div>
      )}
    </div>
  );
};

export default UploadButtonsAndProgress;
