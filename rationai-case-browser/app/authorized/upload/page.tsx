import React from "react";
import FileBrowseInput from "../../components/Upload/FileBrowseInput";
import UploadButtonsAndProgress from "../../components/Upload/UploadButtonsAndProgress";
import UploadForm from "@/app/components/Upload/UploadForm";

const UploadPage = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-5/6 flex flex-col items-center gap-2 pb-8">
        <div className="font-sans font-semibold text-slate-500 text-2xl">
          Upload to project
        </div>
        <div className="font-sans font-medium text-slate-700 text-base">
        Select folder with .mrxs files and upload it here. You will not see files in the file browser, just upload the root folder. By clicking on &apos;Upload&apos; you start uploading the files and processing them. This can be done repeatedly to retry with failed files, it is a good idea to wait for the current session to finish though before doing so. By selecting &apos;Monitor&apos; the provided files will be only checked for presence and progress/status.
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full">
            <FileBrowseInput />
          </div>
          <div className="w-2/3 flex flex-col items-center gap-8">
            <UploadForm />
            <UploadButtonsAndProgress formID="uploadForm"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
