import React from 'react';
import Image from 'next/image';
import { markVisited } from '../SlideVisualizations';

type Props = {
  jobName?: string;
  jobDescription?: string;
  href: string;
  onClick: () => void;
};

const AvailableVis = ({ jobName, jobDescription, href, onClick }: Props) => {
  return (
    <a
      href={href}
      className="group relative flex justify-center"
      onClick={(e) => markVisited(e, href)}
    >
      <button
        type="button"
        onClick={onClick}
        className="btn btn-square btn-sm h-10 w-10 border-green-600 bg-green-100 hover:border-green-600 hover:bg-green-100 group-visited:border-purple-400 group-visited:bg-purple-200"
      >
        <Image
          className=""
          src="/svg/layer.svg"
          alt="Visualisation"
          height={25}
          width={25}
        />
        <div className="absolute left-[26px] top-[26px] flex h-3 w-3 justify-center text-[8px]">
          <div className="font-extrabold text-neutral-800">
            {jobName
              ?.split(' ')
              .slice(0, 2)
              .reduce((prev, curr) => prev + (curr[0] || ''), '')}
          </div>
        </div>
      </button>
      <div className="dark:bg-dark absolute bottom-11 flex w-max max-w-60 scale-0 flex-col items-center rounded border border-gray-500 bg-white p-[2px]  transition-all group-hover:scale-100">
        <span className="text-xs">{jobName || 'Job'}</span>
        <span className="text-xs font-semibold text-green-500">completed</span>
        {jobDescription && (
          <span className="text-center text-xs text-slate-500">
            {jobDescription}
          </span>
        )}
      </div>
    </a>
  );
};

export default AvailableVis;
