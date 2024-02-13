import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CaseHierarchy } from "lib-empationapi/src/v3/extensions/types/case-hierarchy-result";
import { Case } from "lib-empationapi/src/v3/root/types/case";

type Props = {
  root: boolean,
  rootLink: string,
  hierarchy: CaseHierarchy,
}

// group-open:after:rotate-[-135deg]

const CaseTree = async ({root, rootLink, hierarchy }: Props) => {
  return (
    <div className="max-w-full">
      <ul className={root ? "menu pl-0 menu-xs bg-gray-50 rounded-lg" : "pl-0"}>
        {!hierarchy.lastLevel ? (
          hierarchy.items as CaseHierarchy[]).map((item) => (
            <li key={item.levelName} className="max-w-full truncate">
              <details open={!item.items[0].local_id} className="max-w-full *:open:after:rotate-[-135deg]">
                <summary className="flex flex-row-reverse justify-end">
                  <div className="truncate">{item.levelName}</div>
                  {/* <Image
                      src='/file_icons/folder.svg'
                      alt='Folder'
                      height={14}
                      width={14}
                    /> */}
                </summary>
                <CaseTree root={false} rootLink={rootLink + `/${item.levelName}`} hierarchy={item} />
              </details>
            </li>
            )
          ) : 
          (hierarchy.items as Case[]).map((item) => (
            <li key={item.local_id} className="truncate">
              <Link href={`/authorized/cases/case/${item.local_id}`} className="flex flex-row max-w-full">
                <Image
                  src={'/file_icons/folder.svg' }
                  alt='Icon'
                  height={14}
                  width={14}
                />
                <div className="truncate">
                  {item.local_id}
                </div>
              </Link>
            </li>
            )
          )
        }
      </ul>
    </div>
  );
};

export default CaseTree;
