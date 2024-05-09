import Redirect from '@/app/components/Redirect/Redirect';
import Image from 'next/image';
import React from 'react';

type Props = {
  name: string;
  desc?: string;
  link: string;
  shallow?: boolean;
};

const FolderRow = ({ name, desc, link, shallow = false }: Props) => {
  return (
    <div className="flex max-w-full flex-row items-center gap-4 border-b-[1px] dark:border-neutral">
      <div className="min-w-max flex-1 p-[6px]">
        <Redirect
          link={link}
          shallow={shallow}
          className="dark:text-base-dark link-hover flex cursor-pointer flex-row items-center gap-3 font-sans font-semibold text-gray-800"
        >
          <Image
            className="dark:svg-filter-dark"
            src="/file_icons/folder.svg"
            alt="Folder"
            height={16}
            width={16}
          />
          {name}
        </Redirect>
      </div>
      <div className="text-l max-w-[50%] truncate p-[6px] pr-10 font-sans font-medium text-slate-400">
        {desc}
      </div>
    </div>
  );
};

export default FolderRow;
