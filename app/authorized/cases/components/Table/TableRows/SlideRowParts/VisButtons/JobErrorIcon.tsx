import React from 'react';
import Image from 'next/image';

const JobErrorIcon = () => {
  return (
    <div className="group relative flex justify-center">
      <Image
        className="svg-filter-red"
        src="/svg/error.svg"
        alt="Job error"
        height={18}
        width={18}
      />
      <div className="dark:bg-dark absolute bottom-8 flex w-max scale-0 flex-col items-center rounded border border-gray-500 bg-white p-[2px]  transition-all group-hover:scale-100">
        <span className="text-xs">Slide has jobs that ended with</span>
        <span className="text-xs font-semibold text-red-700">error</span>
      </div>
    </div>
  );
};

export default JobErrorIcon;
