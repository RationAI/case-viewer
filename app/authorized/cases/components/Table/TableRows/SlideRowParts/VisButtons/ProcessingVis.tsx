import React from 'react';
import Image from 'next/image';

type Props = {
  jobName?: string;
  jobDescription?: string;
};

const ProcessingVis = ({ jobName, jobDescription }: Props) => {
  return (
    <div className="group relative flex justify-center">
      <button
        type="button"
        onClick={() => {}}
        className="btn btn-disabled btn-square btn-sm h-10 w-10 animate-pulse !border-lime-300 !bg-lime-100"
      >
        <Image
          className="animate-spin opacity-30"
          src="/svg/loader2.svg"
          alt="Loading..."
          height={20}
          width={20}
        />
      </button>
      <div className="dark:bg-dark absolute bottom-11 flex w-max max-w-60 scale-0 flex-col items-center rounded border border-gray-500 bg-white p-[2px]  transition-all group-hover:scale-100">
        <span className="text-xs">{jobName || 'Job'}</span>
        <span className="animate-pulse text-xs font-semibold text-lime-500">
          processing
        </span>
        {jobDescription && (
          <span className="text-center text-xs text-slate-500">
            {jobDescription}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProcessingVis;
