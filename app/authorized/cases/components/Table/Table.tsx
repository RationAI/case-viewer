import { TableStructureT } from "@/type-definitions";
import React from "react";
import FolderRow from "./TableRows/FolderRow";
import FileRow from "./TableRows/FileRow";
import CollapseCaseRow from "./TableRows/CollapseCaseRow";

type Props = {
  tableStructure: TableStructureT;
};

const Table = ({ tableStructure }: Props) => {
  return (
    <div>
      {tableStructure.folders && (
        <div className="flex flex-col gap-1">
          {tableStructure.parent && (
            <FolderRow name=".." link={tableStructure.parent} shallow />
          )}
          {tableStructure.folders.map((folder) => (
            <FolderRow
              key={folder.link}
              name={folder.name}
              link={folder.link}
              shallow
            />
          ))}
        </div>
      )}
      {tableStructure.cases && (
        <div className="flex flex-col gap-1">
          {tableStructure.parent && (
            <FolderRow name=".." link={tableStructure.parent} shallow />
          )}
          {tableStructure.mergeCases ? (
            <>
              <ul className="menu p-0">
                {tableStructure.cases.map((c) => (
                  <CollapseCaseRow key={c.caseObj.id} caseRow={c} defaultOpen={tableStructure.cases ? tableStructure.cases.length <= 1 : false}/>
                ))}
              </ul>
            </>
          ) : (
            <>
              {tableStructure.cases.map((c) => (
                <FolderRow
                  key={c.caseObj.id}
                  name={c.caseObj.local_id || c.caseObj.id}
                  desc={c.caseObj.description || undefined}
                  link={`/authorized/cases/case/${c.caseObj.id}`}
                  shallow
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
