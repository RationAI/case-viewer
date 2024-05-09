'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { MenuItemT } from '@/type-definitions';
import Image from 'next/image';
import MenuContent from '../MenuContent/MenuContent';
import UserBubble from './UserBubble';
import { usePathname } from 'next/navigation';
import Redirect from '../Redirect/Redirect';
import { getPathParts, getSettings } from '@/app/utils';
import { checkSessionOnClient, noAuthActive } from '@/app/utils/auth';

const homeLink = '/';

const navbarMenu: MenuItemT[] = [
  {
    label: 'Cases',
    link: 'cases/path',
  },
  {
    label: 'Search',
    link: 'cases/search',
  },
  {
    label: 'Upload',
    link:
      process.env.NEXT_PUBLIC_UPLOADER_LINK ||
      'https://rationai.cloud.trusted.e-infra.cz',
    external: true,
  },
  {
    label: 'Feedback',
    link: 'feedback',
  },
];

if (getSettings()['allowAnnotationPresets']) {
  navbarMenu.push({
    label: 'Annotations',
    link: 'annotations',
  });
}

const Navbar = () => {
  const { data: session } = useSession();
  const relativePath = usePathname();

  const [pathParts, setPathParts] = useState<string[]>(
    getPathParts(relativePath),
  );

  useEffect(() => {
    setPathParts(getPathParts(relativePath));
  }, [relativePath]);

  let menuItems = navbarMenu.map((item) => {
    const absoluteLink = item.external ? item.link : `/authorized/${item.link}`;
    const newItem = {
      ...item,
      link: absoluteLink,
    };
    return newItem;
  });

  if (!checkSessionOnClient(session)) {
    menuItems = [];
  }

  return (
    <nav className="dark:border-color-dark navbar fixed z-10 min-h-[3.5rem] border-b border-neutral bg-base-100 p-0 px-2 shadow">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost md:hidden">
          <Image
            className="dark:svg-filter-dark"
            src="/svg/menu.svg"
            alt="Menu"
            height={25}
            width={25}
          />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <MenuContent menuItems={menuItems} />
        </ul>
      </div>
      <div className="flex-1 justify-center md:flex-none">
        <Redirect
          link={homeLink}
          className="btn btn-disabled btn-ghost !bg-inherit !bg-opacity-100 text-2xl normal-case"
        >
          <Image
            className="dark:svg-soft-filter-dark"
            src="/svg/rationai-color.svg"
            alt="RationAI"
            height={120}
            width={120}
          />
        </Redirect>
      </div>
      <div className="navbar-center hidden flex-1 md:flex">
        <ul className="menu menu-horizontal px-1 py-0">
          {menuItems.map((menuItem) => (
            <li key={menuItem.label}>
              {!menuItem.subItems ? (
                <Redirect
                  link={menuItem.link}
                  external={menuItem.external}
                  shallow={pathParts[0] === 'authorized'}
                >
                  {menuItem.label}
                </Redirect>
              ) : (
                <details>
                  <summary>{menuItem.label}</summary>
                  <ul className="p-2">
                    {menuItem.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Redirect
                          link={subItem.link}
                          external={menuItem.external}
                          shallow={pathParts[0] === 'authorized'}
                        >
                          {subItem.label}
                        </Redirect>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          ))}
        </ul>
      </div>
      {!noAuthActive && <UserBubble />}
    </nav>
  );
};

export default Navbar;
