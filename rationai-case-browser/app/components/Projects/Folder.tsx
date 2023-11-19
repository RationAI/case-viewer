import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
  name: string,
  link: string,
}

const Folder = ({name, link}: Props) => {
  return (
    <tr>
      <Link
        className="flex flex-row items-center gap-3 p-2 link-hover"
        href={link}
      >
        <Image
          src="/file_icons/folder.svg"
          alt="Folder"
          height={16}
          width={16}
        />
        {name}
      </Link>
    </tr>
  );
};

export default Folder;
