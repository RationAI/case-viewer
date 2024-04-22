import React from "react";
import Image from "next/image";
import { CaseHierarchy } from "@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result";
import Redirect from "../Redirect/Redirect";
import { CaseH } from "@/EmpationAPI/src/v3/extensions/types/case-h";
import { getCaseNameFromLocalID } from "@/app/utils";

type Props = {
  root: boolean,
  rootLink: string,
  hierarchy: CaseHierarchy,
}

const preventClickPropagation = (e: React.MouseEvent) => {
  if((e.currentTarget.parentElement?.parentElement as HTMLDetailsElement).open) {
    e.preventDefault();
  }
}

const CaseTree = ({root, rootLink, hierarchy }: Props) => {
  console.log(hierarchy)
  return (
    <div className="max-w-full">
      <ul className={root ? "menu pl-0 pt-0 menu-xs rounded-lg" : "pl-0"}>
        {!hierarchy.lastLevel ? (
          hierarchy.items as CaseHierarchy[]).map((item) => (
            <li key={item.levelName} className="max-w-full truncate">
              <details open={item.lastLevel !== undefined && !item.lastLevel} className="max-w-full *:open:after:rotate-[45deg] *:open:after:mt-[-0.5rem] *:after:rotate-[-45deg] *:after:mt-[-0.25rem]">
                <summary className="flex flex-row-reverse justify-end py-0 active:!bg-inherit hover:bg-inherit">
                  <div className="flex flex-row flex-1" onClick={(e) => preventClickPropagation(e)}>
                    <Redirect link={`${rootLink}/${item.levelName}`} className="flex-1" shallow>
                      <div className="truncate hover:bg-hover rounded-md px-[0.375rem] py-[0.25rem]">{item.levelName}</div>
                    </Redirect>
                  </div>
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
                  className="dark:svg-filter-dark"
                  src={'/file_icons/folder.svg' }
                  alt='Icon'
                  height={14}
                  width={14}
                />
                <div className="truncate">
                  {getCaseNameFromLocalID(item.local_id) || item.id}
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
