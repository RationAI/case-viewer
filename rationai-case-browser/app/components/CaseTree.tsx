import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CaseHierarchy } from "lib-empationapi/src/v3/extensions/types/case-hierarchy-result";
import { Case } from "lib-empationapi/src/v3/root/types/case";

type Props = {
  root: boolean,
  rootLink: string,
  hierarchy: CaseHierarchy,
  includeCases: boolean,
}

const CaseTree = async ({root, rootLink, hierarchy, includeCases }: Props) => {
  return (
    <div className="max-w-full">
      <ul className={root ? "menu pl-0 menu-xs bg-gray-50 rounded-lg" : "pl-0"}>
        {!hierarchy.lastLevel ? (
          hierarchy.items as CaseHierarchy[]).map((item) => (
            <li key={item.levelName} className="max-w-full truncate">
              <details open className="max-w-full">
                <summary>
                  <Image
                      src='/file_icons/folder.svg'
                      alt='Folder'
                      height={16}
                      width={16}
                    />
                  {item.levelName}
                </summary>
                <CaseTree root={false} rootLink={rootLink + `/${item.levelName}`} hierarchy={item} includeCases />
              </details>
            </li>
            )
          ) : 
          (hierarchy.items as Case[]).map((item) => (
            <li key={item.local_id} className="truncate">
              <Link href={`/authorized/cases/case/${item.local_id}`} className="flex flex-row max-w-full">
                <Image
                  src={'/file_icons/default_file.svg' }
                  alt='Icon'
                  height={16}
                  width={16}
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
