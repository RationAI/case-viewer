import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
  name: string,
  link: string,
}

const FolderRow = ({name, link}: Props) => {
  return (
    <tr>
      <td className="p-2">
        <Link
          className="flex flex-row items-center gap-3 link-hover"
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
      </td>
    </tr>
  );
};

export default FolderRow;
