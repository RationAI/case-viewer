import React from "react";
import { MenuItemT } from "@/type-definitions";
import Link from "next/link";
import Image from "next/image";
import MenuContent from "../MenuContent/MenuContent";

const homeLink = "/";

const secondaryMenu: MenuItemT[] = [
  {
    label: "Files",
    link: "/files",
  },
  {
    label: "Upload",
    link: "/upload",
  },
  {
    label: "Annotations",
    link: "/annotations",
  },
];

const userMenu: MenuItemT[] = [
    {
      label: "Profile",
      link: "/user",
    },
    {
      label: "Settings",
      link: "/",
    },
    {
      label: "Logout",
      link: "/",
    },
  ];

const Navbar = () => {
  return (
    <nav className="navbar p-2 bg-base-100 border-b border-neutral shadow fixed z-10">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost md:hidden">
          <Image src="/svg/menu.svg" alt="Menu" height={25} width={25} />
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <MenuContent menuItems={secondaryMenu} />
        </ul>
      </div>
      <div className="flex-1 justify-center md:flex-none">
        <Link href={homeLink} className="btn btn-ghost normal-case text-2xl">
          <Image
            src='/svg/rationai-color.svg'
            alt='RationAI'
            height={130}
            width={130}
          />
        </Link>
      </div>
      <div className="navbar-center hidden md:flex flex-1">
        <ul className="menu menu-horizontal px-1">
          {secondaryMenu.map((menuItem) => (
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
          <label tabIndex={0} className="btn btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src="/svg/user2.svg" alt="User" height={10} width={10} />
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
