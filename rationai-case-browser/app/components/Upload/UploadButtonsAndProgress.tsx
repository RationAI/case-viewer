'use client'

import React, { useState } from "react";

type Props = {
  formID: string;
}

const UploadButtonsAndProgress = ({ formID }: Props) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [uploadInProgress, setUploadInProgress] = useState(false)

  const handleUploadClick = () => {
    setStatusMessage("Upload in progress...");
    setUploadInProgress(true);
  };

  const handleMonitorClick = () => {};

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
        <div className="flex flex-row gap-2">
          <button
            //type="submit"
            //form={formID}
            onClick={handleUploadClick}
            className="btn btn-sm btn-outline font-sans"
          >
            Upload
          </button>
          <button
            //type="submit"
            //form={formID}
            onClick={handleMonitorClick}
            className="btn btn-sm btn-outline btn-error font-sans"
          >
            Monitor
          </button>
        </div>
        {uploadInProgress && (
          <div className="w-1/2 h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="w-3/4 h-3 animate-pulse rounded-full bg-gradient-to-r from-base-content to-error"
            ></div>
          </div>
        )}
      </div>
        {uploadInProgress && (
          <div className="flex flex-row justify-end">
            <div className="font-sans pr-1">{statusMessage}</div>
          </div>
        )}
    </div>
  );
};

export default UploadButtonsAndProgress;
