import { FileTreeStructureT } from "@/type-definitions";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  root: boolean,
  fileTree?: FileTreeStructureT,
}

const fileExtensionIcons: { [k: string] : string } = {
  pdf: 'text_file',
  png: 'image_file',
}

const fileStructure: FileTreeStructureT = {
  name: "root",
  path: "/",
  folder: true,
  items: [
    {
      name: "project1",
      path: "/",
      folder: true,
      items: [
        {
          name: "subproject1",
          path: "/",
          folder: true,
          items: [
            {
              name: "file1",
              path: "/",
              folder: false,
              extension: 'pdf',
            },
            {
              name: "file2",
              path: "/",
              folder: false,
              extension: 'png',
            },
            {
              name: "file3",
              path: "/",
              folder: false,
              extension: 'something',
            },
          ],
        },
        {
          name: "subproject2",
          path: "/",
          folder: true,
          items: [
            {
              name: "file1",
              path: "/",
              folder: false,
              extension: 'pdf',
            },
          ],
        },
      ],
    },
    {
      name: "project2",
      path: "/",
      folder: true,
      items: [
        {
          name: "subproject1",
          path: "/",
          folder: true,
          items: [
            {
              name: "file1",
              path: "/",
              folder: false,
              extension: 'png',
            },
          ],
        },
        {
          name: "subproject2",
          path: "/",
          folder: true,
        },
      ],
    },
    {
      name: "rootfile",
      path: "/",
      folder: false,
      extension: 'something',
    },
  ],
};

const FileTree = async ({root, fileTree = fileStructure}: Props) => {
  return (
    <div>
      <ul className={root ? "menu menu-xs bg-gray-50 rounded-lg min-w-[20rem] max-w-xs overflow-x-scroll" : ""}>
        {fileTree.items?.map((item) => (
          <li key={item.path}>
            {item.folder ? (
              <details open>
                <summary>
                  <Image
                      src='/file_icons/folder.svg'
                      alt='Folder'
                      height={16}
                      width={16}
                    />
                  {item.name}
                </summary>
                <FileTree root={false} fileTree={item} />
              </details>
            ) : (
              <Link href={item.path}>
                <Image
                  src={'/file_icons/' + (fileExtensionIcons[item.extension!] ? fileExtensionIcons[item.extension!] : 'default_file') + '.svg' }
                  alt='Icon'
                  height={16}
                  width={16}
                />
                {item.name  + '.' + item.extension!}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileTree;
