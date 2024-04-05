import { TableStructureT } from "@/type-definitions";
import React from "react";
import FolderRow from "./TableRows/FolderRow";
import FileRow from "./TableRows/FileRow";
import CollapseCaseRow from "./TableRows/CollapseCaseRow";

type Props = {
  tableStructure: TableStructureT;
  showHeader?: boolean;
  advancedUser?: boolean;
};

const Table = ({ tableStructure, showHeader = true, advancedUser = false }: Props) => {
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
      {tableStructure.slides && tableStructure.slides.length > 0 && (
        <div className="flex flex-col gap-1">
          {showHeader &&
            <div className="flex gap-4 font-sans font-semibold text-slate-500 pr-12">
              <div className="min-w-[8rem] text-center">Preview</div>
              <div className="flex-1 px-1 min-w-[18rem]">Info</div>
              {advancedUser && (
                <>
                  <div className="min-w-[12.5rem] text-center">Masks</div>
                  <div className="min-w-[5rem] text-center">Annot</div>
                </>
              )}
              <div className="min-w-[12.5rem] text-center">Visualizations</div>
              <div className="min-w-[4rem] text-center">Actions</div>
            </div>
          }
          {tableStructure.slides.map((slide, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <FileRow key={slide.slideId} slide={slide} rowNo={idx} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;
