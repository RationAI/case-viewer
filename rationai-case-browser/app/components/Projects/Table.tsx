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
      <table className="table">
        <thead>
          <tr>
            <th className="w-32 text-center">Preview</th>
            <th className="w-96">Info</th>
            <th className="w-32 text-center">Masks</th>
            <th className="w-32 text-center">Annotations</th>
            <th>Actions</th>
            <th className="w-14"></th>
          </tr>
        </thead>
        <tbody>
          {folderStructure.files.map((file, idx) => (
            <FileRow key={file.uuid} file={file} rowNo={idx}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
