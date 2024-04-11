"use client";
import React, { useState } from "react";
import Image from "next/image";
import CaseTree from "./CaseTree";
import { CaseHierarchy } from "@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result";

type Props = {
  caseHierarchy?: CaseHierarchy,
  isPending: boolean,
  isError: boolean,
}

const Sidebar = ({caseHierarchy, isPending, isError}: Props) => {
  const [extended, setExtended] = useState(true);

  const sidebarIconMenu = [
    {
      label: "Cases",
      onClick: () => setExtended(true),
      icon: "/svg/projects.svg",
      subItems: [],
    },
  ];

  return (
    <aside
      className={
        "flex flex-col items-center bg-base-100 border-r border-neutral dark:border-color-dark shadow max-h-full" +
        (extended ? " min-w-[13rem] max-w-[13rem]" : "")
      }
    >
      <div className="navbar-center pt-1 p-[2px] w-full flex-1 max-h-full overflow-y-auto">
        <div className={`${extended ? "" : "hidden"}`}>
          <div className="flex flex-row justify-between items-center">
            <div className="px-2 font-sans font-semibold text-gray-800 dark:text-base-dark">{"Cases"}</div>
            <label
              tabIndex={0}
              className="btn btn-sm btn-ghost"
              onClick={() => setExtended(!extended)}
            >
              <Image
                className="dark:svg-filter-dark"
                src="/svg/expand-left.svg"
                alt="Extend"
                height={15}
                width={15}
              />
            </label>
          </div>
          {isPending && 
            <div className="pl-2 text-xs">Loading...</div>
          }
          {isError && 
            <div className="pl-2 text-xs">Unable to fetch</div>
          }
          {caseHierarchy && 
            <CaseTree root={true} rootLink={"/authorized/cases/path"} hierarchy={caseHierarchy} />
          }
        </div>
        <ul className={`menu p-0 min-w-max${extended ? " hidden" : ""}`}>
          {sidebarIconMenu.map((menuItem) => (
            <li key={menuItem.label}>
              <div onClick={menuItem.onClick}>
                {menuItem.icon &&
                  <div className="flex flex-col items-center">
                    <Image
                      className="dark:svg-filter-dark"
                      src={menuItem.icon}
                      alt={menuItem.label}
                      height={30}
                      width={30}
                    />
                    <div className="font-sans text-xs font-semibold text-slate-700 dark:text-base-dark">{menuItem.label}</div>
                  </div>
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
