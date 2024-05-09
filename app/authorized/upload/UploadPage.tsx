'use client';

import React from 'react';
import FileBrowseInput from './components/FileBrowseInput';
import UploadButtonsAndProgress from './components/UploadButtonsAndProgress';
import UploadForm from '@/app/authorized/upload/components/UploadForm';

// NOT USED YET

const UploadPage = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-5/6 flex-col items-center gap-2 pb-8">
        <div className="font-sans text-2xl font-semibold text-slate-500">
          Upload to project
        </div>
        <div className="font-sans text-base font-medium text-slate-700">
          Select folder with .mrxs files and upload it here. You will not see
          files in the file browser, just upload the root folder. By clicking on
          &apos;Upload&apos; you start uploading the files and processing them.
          This can be done repeatedly to retry with failed files, it is a good
          idea to wait for the current session to finish though before doing so.
          By selecting &apos;Monitor&apos; the provided files will be only
          checked for presence and progress/status.
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <div className="w-full">
            <FileBrowseInput />
          </div>
          <div className="flex w-2/3 flex-col items-center gap-8">
            <UploadForm />
            <UploadButtonsAndProgress formID="uploadForm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
