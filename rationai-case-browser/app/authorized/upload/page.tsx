import React from "react";
import FileBrowseInput from "../../components/Upload/FileBrowseInput";
import Form from "../../components/Upload/Form/Form";
import { FormConfigT } from "@/type-definitions";
import UploadButtonsAndProgress from "../../components/Upload/UploadButtonsAndProgress";

const formConfigExample: FormConfigT = {
  title: "Title",
  description:
    "saasdnasndnaiosndionsaond inaiondnsadn naicnsadnas iainasndisa inaionias niadasdsa d sad asd asd a s dasdsadasd dasdasdas da",
  rows: [
    {
      fields: [
        {
          type: "select",
          fieldID: "0",
          label: "Select",
          defaultValue: "one",
          description: "inionsdnasndnakasmdas",
          options: [
            "one",
            "two",
            "three",
            "longer-option",
            "four",
            "five",
            "six",
          ],
        },
        {
          type: "text",
          fieldID: "1",
          label: "Text",
          defaultValue: "",
        },
      ],
    },
    {
      fields: [
        {
          type: "text",
          fieldID: "2",
          label: "Text",
          defaultValue: "",
        },
      ],
    },
    {
      fields: [
        {
          type: "text",
          fieldID: "3",
          label: "Text",
          defaultValue: "",
        },
      ],
    },
    {
      fields: [
        {
          type: "select",
          fieldID: "4",
          label: "Select",
          defaultValue: "one",
          description: "inionsdnasndnakasmdas",
          options: [
            "one",
            "two",
            "three",
            "longer-option",
            "four",
            "five",
            "six",
          ],
        },
      ],
    },
    {
      fields: [
        {
          type: "text",
          fieldID: "5",
          label: "Text",
          defaultValue: "",
        },
        {
          type: "text",
          fieldID: "6",
          label: "Text",
          defaultValue: "",
        },
      ],
    },
  ],
};

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
            <Form config={formConfigExample} formID="uploadForm" />
            <UploadButtonsAndProgress formID="uploadForm"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
