import { FolderStructure } from "@/type-definitions";
import React from "react";
import FolderRow from "./TableRows/FolderRow";
import FileRow from "./TableRows/FileRow";

type Props = {
  rootPath: string;
  folderStructure: FolderStructure;
};

const Table = ({ rootPath, folderStructure }: Props) => {
  return (
    <div className="overflow-x-auto p-3">
      <table className="table">
        <thead>
          <tr>
            <th>Folders</th>
          </tr>
        </thead>
        <tbody>
          {folderStructure.parent && (
            <FolderRow name=".." link={folderStructure.parent} />
          )}
          {folderStructure.subFolders.map((subFolder) => (
            <FolderRow
              key={subFolder.link}
              name={subFolder.name}
              link={rootPath + subFolder.link}
            />
          ))}
        </tbody>
      </table>
      <div className="flex-col">
            <div className="flex gap-4 font-sans font-semibold text-slate-500 pl-4 pr-12">
              <div className="min-w-[7rem] text-center">Preview</div>
              <div className="flex-1 px-1 min-w-[18rem]">Info</div>
              <div className="min-w-[7rem] text-center">Masks</div>
              <div className="min-w-[7rem] text-center">Annotations</div>
              <div className="min-w-[4rem] text-center">Actions</div>
            </div>
            {folderStructure.files.map((file, idx) => (
              <FileRow key={file.uuid} file={file} rowNo={idx}/>
            ))}
      </div>
    </div>
  );
};

export default Table;
