
import Redirect from "@/app/components/Redirect/Redirect";
import Image from "next/image";
import React from "react";

type Props = {
  name: string,
  desc?: string,
  link: string,
  shallow?: boolean,
}

const FolderRow = ({name, desc, link, shallow = false}: Props) => {
  return (
    <div className="flex flex-row gap-4 items-center border-b-[1px] max-w-full">
      <div className="p-[6px] flex-1 min-w-max">
        <Redirect
          link={link}
          shallow={shallow}
          className="flex flex-row items-center gap-3 link-hover font-sans font-semibold text-gray-800 cursor-pointer"
        >
          <Image
            src="/file_icons/folder.svg"
            alt="Folder"
            height={16}
            width={16}
          />
          {name}
        </Redirect>
      </div>
      <div className='p-[6px] pr-10 max-w-[50%] font-sans font-medium text-slate-400 text-l truncate'>{desc}</div>
    </div>
  );
};

export default FolderRow;
