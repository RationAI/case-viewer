import { TableSlideRowT } from "@/type-definitions";
import React from "react";
import ImageGrid from "./FileRowParts/ImageGrid";
import FileRowActions from "./FileRowParts/FileRowActions";
import FileRowSelect from "./FileRowParts/FileRowSelect";
import ModalImagePreview from "../../ModalImagePreview/ModalImagePreview";
import ImagePreview from "./FileRowParts/ImagePreview";

type Props = {
  file: TableSlideRowT;
  rowNo: number;
};

const FileRow = ({ file, rowNo }: Props) => {

  return (
    <div key={file.path} className="collapse bg-gray-100 collapse-arrow rounded-lg overflow-visible">
      <input type="checkbox" />
      <div className="collapse-title flex flex-row gap-4 py-0 pl-0">
        <ImagePreview modalId="modalId" imageLink="https://fastly.picsum.photos/id/353/1000/1600.jpg?hmac=6lprb8McnS7Y-BtUjqLG8LN-dkqECqIkwHrpY4g5SUE" />
        <div className="flex-1 flex flex-row gap-4 py-[0.375rem]">
          <div className="flex flex-col justify-center min-w-[18rem] flex-1 px-2 py-2">
            <p className="font-bold">{file.name}</p>
            <p className="">{file.created}</p>
            <p className="">{file.createdBy}</p>
          </div>
          <div className="flex w-[12.5rem] items-center justify-center z-10">
            <FileRowSelect options={file.masks.map((annot) => annot.name)}/>
          </div>
          <div className="flex items-center justify-center z-10 px-[0.375rem]">
            <ImageGrid
              images={file.masks}
              count={9}
              typeName="annotation"
              rowNo={rowNo}
            />
          </div>
          <div className="w-16 z-10">
            <FileRowActions />
          </div>
        </div>
      </div>
      <div className="collapse-content px-2">
        <div className="pt-2">
          {Object.entries(file.metadata).map(([key, value]) => (
            <div key={key} className="flex gap-1">
              <p className="font-medium">{key + ":"}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
      <ModalImagePreview modalId="modalId" imageLink="https://fastly.picsum.photos/id/353/1000/1600.jpg?hmac=6lprb8McnS7Y-BtUjqLG8LN-dkqECqIkwHrpY4g5SUE" />
    </div>
  );
};

export default FileRow;
