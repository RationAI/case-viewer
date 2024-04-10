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
        "flex flex-col items-center bg-base-100 border-r border-neutral shadow max-h-full" +
        (extended ? " min-w-[13rem] max-w-[13rem]" : "")
      }
    >
      <div className="navbar-center pt-1 p-[2px] w-full flex-1 max-h-full overflow-y-auto">
        {extended ? (
          <div>
            <div className="flex flex-row justify-between items-center">
              <div className="px-2 font-sans font-semibold text-gray-800">{"Cases"}</div>
              <label
                tabIndex={0}
                className="btn btn-sm btn-ghost"
                onClick={() => setExtended(!extended)}
              >
                <Image
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
        ) : (
          <ul className="menu p-0 min-w-max">
            {sidebarIconMenu.map((menuItem) => (
              <li key={menuItem.label}>
                <div onClick={menuItem.onClick}>
                  {menuItem.icon &&
                    <div className="flex flex-col items-center">
                      <Image
                        src={menuItem.icon}
                        alt={menuItem.label}
                        height={30}
                        width={30}
                      />
                      <div className="font-sans text-xs font-semibold text-slate-700">{menuItem.label}</div>
                    </div>
                  }
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <div className="flex-none w-full border-t border-neutral">
        <div className={"flex flex-row p-1" + (extended ? " justify-end" : " justify-center")}>
          <label
            tabIndex={0}
            className="btn btn-ghost"
            onClick={() => setExtended(!extended)}
          >
            <Image
              src={extended ? "/svg/expand-left.svg" : "/svg/expand-right.svg"}
              alt="Extend"
              height={25}
              width={25}
            />
          </label>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
