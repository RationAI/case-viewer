import { FileT } from "@/type-definitions";
import React from "react";
import Image from "next/image";
import ImageGrid from "./FileRowParts/ImageGrid";
import FileRowActions from "./FileRowParts/FileRowActions";
import FileRowSelect from "./FileRowParts/FileRowSelect";

type Props = {
  file: FileT;
  rowNo: number;
};

const FileRow = ({ file, rowNo }: Props) => {

  return (
    <div key={file.path} className="collapse bg-gray-50 collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title flex flex-row gap-4">
        <div className="aspect-square min-w-[7rem]">
          <Image className="object-cover block m-auto" src={file.previewURL} alt="Preview" width={110} height={110}/>
        </div>
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
      <div className="collapse-content">
        {Object.entries(file.metadata).map(([key, value]) => (
          <div key={key} className="flex gap-1">
            <p className="font-medium">{key + ":"}</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileRow;
