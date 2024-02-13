import React from "react";
import Image from "next/image";

const FileCard = () => {
  return (
    <div className="card w-full bg-base-100 border border-base-content">
      <figure className="px-4 pt-4">
        <Image
          className="object-cover block m-auto"
          src="/file_icons/image_file.svg"
          alt="Preview"
          width={200}
          height={200}
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-col min-w-[18rem] flex-1 px-2 py-2">
          <p className="font-bold">File name</p>
          <p className="">Date 09283123021</p>
          <p className="">John Doe</p>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
