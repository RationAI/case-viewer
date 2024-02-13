import { TableStructureT } from "@/type-definitions";
import React from "react";
import FolderRow from "./TableRows/FolderRow";
import FileRow from "./TableRows/FileRow";

type Props = {
  tableStructure: TableStructureT;
};

const Table = ({ tableStructure }: Props) => {
  return (
    <div className="overflow-x-auto p-3">
      <div className='font-sans font-semibold text-slate-500 text-xl pl-2'>{tableStructure.name}</div>
      {tableStructure.folders &&
        <div className="flex flex-col gap-1">
          {tableStructure.parent && (
            <FolderRow name=".." link={tableStructure.parent} />
          )}
          {tableStructure.folders.map((caseObj) => (
            <FolderRow
              key={caseObj.link}
              name={caseObj.name}
              link={caseObj.link}
            />
          ))}
        </div>
      }
      {tableStructure.cases &&
        <div className="flex flex-col gap-1">
          {tableStructure.parent && (
            <FolderRow name=".." link={tableStructure.parent} />
          )}
          {tableStructure.cases.map((caseObj) => (
            <FolderRow
              key={caseObj.link}
              name={caseObj.name}
              desc={caseObj.desc}
              link={caseObj.link}
            />
          ))}
        </div>
      }
      {tableStructure.slides &&
        <div className="flex-col">
          <div className="flex gap-4 font-sans font-semibold text-slate-500 pl-4 pr-12">
            <div className="min-w-[7rem] text-center">Preview</div>
            <div className="flex-1 px-1 min-w-[18rem]">Info</div>
            <div className="min-w-[12.5rem] text-center">Masks</div>
            <div className="min-w-[7rem] text-center">Annotations</div>
            <div className="min-w-[4rem] text-center">Actions</div>
          </div>
          {tableStructure.slides.map((slide, idx) => (
            <FileRow key={slide.uuid} file={slide} rowNo={idx}/>
          ))}
        </div>
      }
    </div>
  );
};

export default Table;
