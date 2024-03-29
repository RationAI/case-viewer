'use client'

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { MenuItemT } from "@/type-definitions";
import Image from "next/image";
import MenuContent from "../MenuContent/MenuContent";
import UserBubble from "./UserBubble";
import { usePathname } from "next/navigation";
import Redirect from "../Redirect/Redirect";
import { getPathParts } from "@/app/utils";

const homeLink = "/";

const secondaryMenu: MenuItemT[] = [
  {
    label: "Cases",
    link: "cases/path",
  },
  {
    label: "Search",
    link: "cases/search",
  },
  {
    label: "Upload",
    link: "upload",
  },
  {
    label: "Annotations",
    link: "annotations",
  },
];

const Navbar = () => {
  const { data: session } = useSession()
  const relativePath = usePathname()

  const [pathParts, setPathParts] = useState<string[]>(getPathParts(relativePath));

  useEffect(() => {
    setPathParts(getPathParts(relativePath));
  }, [relativePath]);

  let menuItems = secondaryMenu.map((item) => {
    const absoluteLink = `/authorized/${item.link}`
    const newItem = {
      ...item,
      link: absoluteLink
    }
    return newItem
  })

  if (!session) {
    menuItems = []
  }

  return (
    <nav className="navbar px-2 p-0 bg-base-100 border-b border-neutral shadow fixed z-10 min-h-[3.5rem]">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost md:hidden">
          <Image src="/svg/menu.svg" alt="Menu" height={25} width={25} />
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <MenuContent menuItems={menuItems} />
        </ul>
      </div>
      <div className="flex-1 justify-center md:flex-none">
        <Redirect link={homeLink} className="btn btn-ghost normal-case text-2xl" shallow={false}>
          <Image
            src='/svg/rationai-color.svg'
            alt='RationAI'
            height={120}
            width={120}
          />
        </Redirect>
      </div>
      <div className="navbar-center hidden md:flex flex-1">
        <ul className="menu menu-horizontal px-1 py-0">
          {menuItems.map((menuItem) => (
            <li key={menuItem.label}>
              {!menuItem.subItems ? (
                <Redirect link={menuItem.link} shallow={pathParts[0] === "authorized"}>{menuItem.label}</Redirect>
              ) : (
                <details>
                  <summary>{menuItem.label}</summary>
                  <ul className="p-2">
                    {menuItem.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Redirect link={subItem.link} shallow={pathParts[0] === "authorized"}>{subItem.label}</Redirect>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          ))}
        </ul>
      </div>
      <UserBubble />
    </nav>
  );
};

export default Navbar;
