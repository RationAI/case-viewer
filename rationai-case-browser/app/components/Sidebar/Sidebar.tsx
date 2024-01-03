"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuContent from "../MenuContent/MenuContent";
import Image from "next/image";

const primaryMenu = [
  {
    label: "Projects",
    link: "/files",
    icon: "/svg/projects.svg",
    subItems: [
      {
        label: "Project 1",
        link: "/files",
      },
      {
        label: "Project 2",
        link: "/files",
      },
    ],
  },
];

const Sidebar = () => {
  const [extended, setExtended] = useState(true);

  return (
    <aside
      className={
        "flex flex-col items-center bg-base-100 border-r border-neutral shadow" +
        (extended ? " min-w-[13rem]" : "")
      }
    >
      <div className="navbar-center p-2 w-full flex-1">
        {extended ? (
          <ul className="menu xl:menu-vertical lg:min-w-max bg-gray-50 rounded-lg">
            <MenuContent menuItems={primaryMenu} />
          </ul>
        ) : (
          <ul className="menu p-0 min-w-max">
            {primaryMenu.map((menuItem) => (
              <li key={menuItem.label}>
                <Link href={menuItem.link}>
                  <Image
                    src={menuItem.icon}
                    alt={menuItem.label}
                    height={35}
                    width={35}
                  />
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
