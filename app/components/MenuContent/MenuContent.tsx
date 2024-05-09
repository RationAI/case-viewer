import { MenuItemT } from '@/type-definitions';
import Image from 'next/image';
import React from 'react';
import Redirect from '../Redirect/Redirect';

type Props = {
  menuItems: MenuItemT[];
};

const MenuContent = ({ menuItems }: Props) => {
  return (
    <>
      {menuItems.map((menuItem) => (
        <li key={menuItem.label} className="w-[100%]">
          <Redirect
            link={menuItem.link}
            className="max-w-[100%] text-base"
            external={menuItem.external}
            shallow={menuItem.shallowLink}
          >
            {menuItem.icon && (
              <Image
                src={menuItem.icon}
                alt={menuItem.label}
                height={25}
                width={25}
              />
            )}
            {menuItem.label}
          </Redirect>
          {menuItem.subItems && (
            <ul className="w-[90%]">
              {menuItem.subItems.map((subItem) => (
                <li key={subItem.label} className="max-w-[100%]">
                  <Redirect
                    link={subItem.link}
                    className="max-w-[100%]"
                    shallow={false}
                  >
                    <div className="truncate">{subItem.label}</div>
                  </Redirect>
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
