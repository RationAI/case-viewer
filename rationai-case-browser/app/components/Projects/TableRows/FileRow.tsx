import { File } from "@/type-definitions";
import React from "react";
import Image from "next/image";
import ImageGrid from "./ImageGrid";

type Props = {
  file: File;
  rowNo: number;
};

const FileRow = ({ file, rowNo }: Props) => {
  return (
    <tr key={file.path}>
      <td colSpan={6}>
        <div className="collapse bg-gray-50 collapse-arrow">
          <input type="checkbox" />
          <div className="collapse-title flex flex-row gap-4">
            <Image src={file.previewURL} alt="Preview" height={70} width={70} />
            <div className="flex flex-col flex-1 w-96 px-6 py-2">
              <p className="font-bold">{file.name}</p>
              <p className="">{file.created}</p>
              <p className="">{file.createdBy}</p>
            </div>
            <div className="flex items-center justify-center z-10 px-4">
              <ImageGrid images={file.masks} count={9} typeName="mask" rowNo={rowNo}/>
            </div>
            <div className="flex items-center justify-center z-10 px-4">
              <ImageGrid images={file.masks} count={9} typeName="annotation" rowNo={rowNo} />
            </div>
            <div className="w-16">

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
      </td>
    </tr>
  );
};

export default FileRow;
