import { SlideRowT } from '@/type-definitions';
import React from 'react';
import SlideRow from './TableRows/SlideRow';

type Props = {
  slideRows: SlideRowT[];
  showHeader?: boolean;
};

const SlideTable = ({ slideRows, showHeader = true }: Props) => {
  return (
    <div>
      {slideRows.length > 0 && (
        <div className="flex flex-col gap-1">
          {showHeader && (
            <div className="flex gap-4 pr-12 font-sans font-semibold text-slate-500">
              <div className="min-w-[8rem] text-center">Preview</div>
              <div className="min-w-[15rem] flex-1 px-1">Info</div>
              <div className="min-w-[15.5rem] text-center">Visualizations</div>
              <div className="min-w-[4rem] text-center">Actions</div>
            </div>
          )}
          {slideRows.map((row, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <SlideRow key={row.slide.id} slideRow={row} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SlideTable;
