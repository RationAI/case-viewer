import { FolderStructure } from "@/type-definitions";
import React from "react";
import Folder from "./Folder";

type Props = {
  rootPath: string,
  folderStructure: FolderStructure,
}

const Table = ({rootPath, folderStructure}: Props) => {
  return (
    <div className="overflow-x-auto p-3">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Folders</th>
          </tr>
        </thead>
        <tbody>
          {folderStructure.parent && 
            <Folder name='..' link={folderStructure.parent} />
          }
          {folderStructure.subFolders.map((subFolder) => 
            <Folder key={subFolder.link} name={subFolder.name} link={rootPath + subFolder.link} />
          )}
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/tailwind-css-component-profile-2@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>Purple</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
