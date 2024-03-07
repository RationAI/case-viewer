'use client'

import React from "react";
import Image from "next/image";


const FileRowActions = () => {

  const handleDownload = () => {

  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-1 py-1">
      <button
        type="submit"
        title="Open in xOpat"
        className="btn btn-sm btn-square p-1 bg-primary hover:bg-primary"
      >
        <Image src="/svg/xopat.svg" alt="Open in xOpat" height={33} width={33} />
      </button>
      <button
        title="Download"
        onClick={handleDownload}
        className="btn btn-sm btn-square p-1 bg-primary hover:bg-primary"
      >
        <Image src="/svg/download.svg" alt="Open in xOpat" height={33} width={33} />
      </button>
    </div>
  );
};

export default FileRowActions;
