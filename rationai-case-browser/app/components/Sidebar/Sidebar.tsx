'use client'
import React, { useState } from "react";
import MenuContent from "../MenuContent/MenuContent";
import Image from "next/image";

const menuItems = [
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

const Sidebar = () => {
  const [extended, setExtended] = useState(true);

  return (
    <aside className="flex flex-col items-center pt-[4.25rem] w-52 h-screen bg-base-100 border-r border-neutral shadow fixed">
      <div className="navbar-center p-2 w-11/12 flex-1">
        <ul className="menu xl:menu-vertical lg:min-w-max bg-gray-50 rounded-lg">
          <MenuContent menuItems={menuItems} />
        </ul>
      </div>
      <div className="flex-none w-full">
        <div className="flex flex-row justify-end">
          <label tabIndex={0} className="btn btn-ghost" onClick={() => setExtended(!extended)}>
            <Image src="/svg/expand-left.svg" alt="Extend" height={25} width={25} />
          </label>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
