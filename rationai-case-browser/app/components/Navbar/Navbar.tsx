import React from "react";
import { MenuItem, UserMenu } from "@/type-definitions";
import Link from "next/link";
import Image from "next/image";

const homeLink = "/";

const menuItems: MenuItem[] = [
  {
    label: "Projects",
    link: "/files",
    subItems: [
      {
        label: "test1",
        link: "/",
      },
      {
        label: "test2",
        link: "/",
      },
    ],
  },
  {
    label: "Upload",
    link: "/upload",
  },
];

const userMenu: UserMenu = {
  items: [
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
  ],
};

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 border-b border-neutral shadow">
      <div className="flex-none">
        <Link href={homeLink} className="btn btn-ghost normal-case text-xl">
          RationAI
        </Link>
      </div>
      <div className="navbar-center flex-1">
        <ul className="menu menu-horizontal px-1">
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
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search files..."
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src="/user2.svg" alt="User" height={10} width={10} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {userMenu.items.map((item) => (
              <li key={item.label}>
                <Link href={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
