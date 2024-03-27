import React from "react";
import Image from "next/image";
import { CaseHierarchy } from "@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result";
import Redirect from "./Redirect/Redirect";
import { CaseH } from "@/EmpationAPI/src/v3/extensions/types/case-h";

type Props = {
  root: boolean,
  rootLink: string,
  hierarchy: CaseHierarchy,
}

const CaseTree = ({root, rootLink, hierarchy }: Props) => {
  return (
    <div className="max-w-full">
      <ul className={root ? "menu pl-0 menu-xs rounded-lg" : "pl-0"}>
        {!hierarchy.lastLevel ? (
          hierarchy.items as CaseHierarchy[]).map((item) => (
            <li key={item.levelName} className="max-w-full truncate">
              <details open={item.lastLevel !== undefined && !item.lastLevel} className="max-w-full *:open:after:rotate-[45deg] *:open:after:mt-[-0.5rem] *:after:rotate-[-45deg] *:after:mt-[-0.25rem]">
                <summary className="flex flex-row-reverse justify-end py-0 active:!bg-gray-50 hover:bg-gray-50">
                  <Redirect link={`${rootLink}/${item.levelName}`} className="flex-1" shallow>
                    <div className="truncate hover:bg-gray-200 rounded-md px-[0.375rem] py-[0.25rem]">{item.levelName}</div>
                  </Redirect>
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
          (hierarchy.items as CaseH[]).map((item) => (
            <li key={item.id} className="truncate">
              <Redirect link={`/authorized/cases/case/${item.id}`} className="flex flex-row max-w-full" shallow>
                <Image
                  src={'/file_icons/folder.svg' }
                  alt='Icon'
                  height={14}
                  width={14}
                />
                <div className="truncate">
                  {item.local_id}
                </div>
              </Redirect>
            </li>
            )
          )
        }
      </ul>
    </div>
  );
};

export default CaseTree;
