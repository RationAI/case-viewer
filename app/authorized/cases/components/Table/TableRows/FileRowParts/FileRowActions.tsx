'use client'

import React from "react";
import Image from "next/image";
import { shallowRedirect } from "@/app/components/Redirect/Redirect";

type Props = {
  slidePath: string
}

const FileRowActions = ({slidePath}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1 py-1">
      <button
        type="submit"
        title="Open in xOpat"
        className="btn btn-sm btn-square border-gray-300 bg-gray-50 hover:bg-gray-200"
      >
        <Image src="/svg/xopat.svg" alt="Open in xOpat" height={25} width={25} />
      </button>
      <button
        title="Slide details"
        onClick={(e) => {shallowRedirect(e, slidePath, false)}}
        className="btn btn-sm btn-square border-gray-300 bg-gray-50 hover:bg-gray-200"
      >
        <Image src="/svg/info.svg" alt="Slide details" height={20} width={20} />
      </button>
    </div>
  );
};

export default FileRowActions;
