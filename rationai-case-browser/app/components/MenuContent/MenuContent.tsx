import { MenuItem } from "@/type-definitions";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
  menuItems: MenuItem[];
};

const MenuContent = ({ menuItems }: Props) => {
  return (
    <>
      {menuItems.map((menuItem) => (
        <li key={menuItem.label}>
          <Link href={menuItem.link} className="text-base">
            {menuItem.icon &&
              <Image src={menuItem.icon} alt={menuItem.label} height={25} width={25} />
            }
            {menuItem.label}</Link>
          {menuItem.subItems && (
            <ul>
              {menuItem.subItems.map((subItem) => (
                <li key={subItem.label}>
                  <Link href={subItem.link}>{subItem.label}</Link>
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
