import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CaseHierarchy } from "@/../EmpationAPI/src/v3/extensions/types/case-hierarchy-result";
import { Case } from "@/../EmpationAPI/src/v3/root/types/case"

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
                <summary className="flex flex-row-reverse justify-end py-0 active:!bg-gray-50 hover:bg-gray-50">
                  <Link href={`${rootLink}/${item.levelName}`} className="flex-1">
                    <div className="truncate hover:bg-gray-200 rounded-md px-[0.375rem] py-[0.25rem]">{item.levelName}</div>
                  </Link>
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
