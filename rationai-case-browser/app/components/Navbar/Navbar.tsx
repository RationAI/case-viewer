'use client'

import React from "react";
import { useSession } from "next-auth/react"
import { MenuItemT } from "@/type-definitions";
import Link from "next/link";
import Image from "next/image";
import MenuContent from "../MenuContent/MenuContent";

const homeLink = "/";

const secondaryMenu: MenuItemT[] = [
  {
    label: "Files",
    link: "",
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

  // TODO get current caseId ?from state?

  const caseIdMock = "caseId-123456";

  let menuItems = secondaryMenu.map((item) => {
    const absoluteLink = `/authorized/cases/${caseIdMock}/${item.link}`
    const newItem = {
      ...item,
      link: absoluteLink
    }
    return newItem
  })

  const userMenu: MenuItemT[] = [
    {
      label: "Profile",
      link: `/authorized/${session?.userId}`,
    },
  ];

  if (!session) {
    menuItems = [
      {
        label: "Sign In",
        link: "/",
      }
    ]
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
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-circle btn-md avatar">
            <div className="w-8 rounded-full">
              <Image src="/svg/user2.svg" alt="User" height={8} width={8} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <MenuContent menuItems={userMenu} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
