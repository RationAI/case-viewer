import { MenuItemT } from "@/type-definitions";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
  menuItems: MenuItemT[];
};

const MenuContent = ({ menuItems }: Props) => {
  return (
    <>
      {menuItems.map((menuItem) => (
        <li key={menuItem.label} className="w-[100%]">
          <Link href={menuItem.link} className="text-base max-w-[100%]">
            {menuItem.icon &&
              <Image src={menuItem.icon} alt={menuItem.label} height={25} width={25} />
            }
            {menuItem.label}</Link>
          {menuItem.subItems && (
            <ul className="w-[90%]">
              {menuItem.subItems.map((subItem) => (
                <li key={subItem.label} className="max-w-[100%]">
                  <Link href={subItem.link} className="max-w-[100%]">
                    <div className="truncate">{subItem.label}</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default MenuContent;
