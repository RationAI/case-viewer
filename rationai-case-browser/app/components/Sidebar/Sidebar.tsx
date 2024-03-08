"use client";
import React, { useState } from "react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
}

const Sidebar = ({children}: Props) => {
  const [extended, setExtended] = useState(false);

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
                <div onClick={menuItem.onClick}>
                  {menuItem.icon &&
                    <Image
                      src={menuItem.icon}
                      alt={menuItem.label}
                      height={30}
                      width={30}
                    />
                  }
                </div>
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
