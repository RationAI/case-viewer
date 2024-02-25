'use client'

import React from "react";
import { useSession } from "next-auth/react"
import { MenuItemT } from "@/type-definitions";
import Link from "next/link";
import Image from "next/image";
import MenuContent from "../MenuContent/MenuContent";
import UserBubble from "./UserBubble";

const homeLink = "/";

const secondaryMenu: MenuItemT[] = [
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
        <Link href={homeLink} className="btn btn-ghost normal-case text-2xl">
          <Image
            src='/svg/rationai-color.svg'
            alt='RationAI'
            height={120}
            width={120}
          />
        </Link>
      </div>
      <div className="navbar-center hidden md:flex flex-1">
        <ul className="menu menu-horizontal px-1 py-0">
          {menuItems.map((menuItem) => (
            <li key={menuItem.label}>
              {!menuItem.subItems ? (
                <Link href={menuItem.link}>{menuItem.label}</Link>
              ) : (
                <details>
                  <summary>{menuItem.label}</summary>
                  <ul className="p-2">
                    {menuItem.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Link href={subItem.link}>{subItem.label}</Link>
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
