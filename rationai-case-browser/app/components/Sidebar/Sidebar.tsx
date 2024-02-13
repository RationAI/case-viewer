"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getCaseSearchResult } from "@/app/utils";
import { MenuItemT } from "@/type-definitions";

type Props = {
  children: React.ReactNode;
}

const sidebarIconMenu = [
  {
    label: "Cases",
    link: "/authorized/cases/path",
    icon: "/svg/projects.svg",
    subItems: [],
  },
];

const Sidebar = ({children}: Props) => {
  const { data: session } = useSession()
  const [extended, setExtended] = useState(false);
  /* const [sidebarMenu, setSidebarMenu] = useState<MenuItemT[]>(sidebarIconMenu)

  useEffect(() => {
    const fetchData = async () => {
      const cases = await getCaseSearchResult(session!, []);
      const newMenu = sidebarMenu
      newMenu[0].link = `/authorized/${session?.userId}`
      newMenu[0].subItems = cases?.map((caseObj) => {
        return { label: caseObj.id, link: `/authorized/cases/${caseObj.id}`}
      })
      setSidebarMenu(newMenu)
    };

    if (session?.accessToken) {
      fetchData()
    } else {
      setSidebarMenu(sidebarIconMenu)
    }
  }, [session, sidebarMenu]) */

  return (
    <aside
      className={
        "flex flex-col items-center bg-base-100 border-r border-neutral shadow" +
        (extended ? " min-w-[13rem]" : "")
      }
    >
      <div className="navbar-center pt-1 p-[2px] w-full flex-1">
        {extended ? (
          <div>
            {children}
          </div>
        ) : (
          <ul className="menu p-0 min-w-max">
            {sidebarIconMenu.map((menuItem) => (
              <li key={menuItem.label}>
                <Link href={menuItem.link}>
                  {menuItem.icon &&
                    <Image
                      src={menuItem.icon}
                      alt={menuItem.label}
                      height={30}
                      width={30}
                    />
                  }
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex-none w-full">
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
      </div>
    </aside>
  );
};

export default Sidebar;
