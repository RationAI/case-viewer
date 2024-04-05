import { SlideRow, TableStructureT } from "@/type-definitions";
import React from "react";
import FileRow from "./TableRows/FileRow";

type Props = {
  slideRows: SlideRow[];
  showHeader?: boolean;
};

const SlideTable = ({ slideRows, showHeader = true}: Props) => {
  return (
    <div>
      {slideRows.length > 0 && (
        <div className="flex flex-col gap-1">
          {showHeader &&
            <div className="flex gap-4 font-sans font-semibold text-slate-500 pr-12">
              <div className="min-w-[8rem] text-center">Preview</div>
              <div className="flex-1 px-1 min-w-[18rem]">Info</div>
              <div className="min-w-[12.5rem] text-center">Visualizations</div>
              <div className="min-w-[4rem] text-center">Actions</div>
            </div>
          }
          {slideRows.map((row, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <FileRow key={row.slide.id} slideRow={row} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SlideTable;
