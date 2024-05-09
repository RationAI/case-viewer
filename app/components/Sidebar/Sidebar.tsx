'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import CaseTree from './CaseTree';
import { CaseHierarchy } from '@/EmpationAPI/src/v3/extensions/types/case-hierarchy-result';
import { HIERARCHY_ROOT_PATH } from '@/app/utils/constants';

type Props = {
  caseHierarchy?: CaseHierarchy;
  isPending: boolean;
  isError: boolean;
};

const Sidebar = ({ caseHierarchy, isPending, isError }: Props) => {
  const [extended, setExtended] = useState(true);

  const sidebarIconMenu = [
    {
      label: 'Cases',
      onClick: () => setExtended(true),
      icon: '/svg/projects.svg',
      subItems: [],
    },
  ];

  return (
    <aside
      className={
        'dark:border-color-dark flex max-h-full flex-col items-center border-r border-neutral bg-base-100 shadow' +
        (extended ? ' min-w-[13rem] max-w-[13rem]' : '')
      }
    >
      <div className="navbar-center max-h-full w-full flex-1 overflow-y-auto p-[2px] pt-1">
        <div className={`${extended ? '' : 'hidden'}`}>
          <div className="flex flex-row items-center justify-between">
            <div className="dark:text-base-dark px-2 font-sans font-semibold text-gray-800">
              {'Cases'}
            </div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-sm"
              onClick={() => setExtended(!extended)}
            >
              <Image
                className="dark:svg-filter-dark"
                src="/svg/expand-left.svg"
                alt="Extend"
                height={15}
                width={15}
              />
            </label>
          </div>
          {isPending && <div className="pl-2 text-xs">Loading...</div>}
          {isError && <div className="pl-2 text-xs">Unable to fetch</div>}
          {caseHierarchy && (
            <CaseTree
              root={true}
              rootLink={HIERARCHY_ROOT_PATH}
              hierarchy={caseHierarchy}
            />
          )}
        </div>
        <ul className={`menu p-0 min-w-max${extended ? ' hidden' : ''}`}>
          {sidebarIconMenu.map((menuItem) => (
            <li key={menuItem.label}>
              <div onClick={menuItem.onClick}>
                {menuItem.icon && (
                  <div className="flex flex-col items-center">
                    <Image
                      className="dark:svg-filter-dark"
                      src={menuItem.icon}
                      alt={menuItem.label}
                      height={30}
                      width={30}
                    />
                    <div className="dark:text-base-dark font-sans text-xs font-semibold text-slate-700">
                      {menuItem.label}
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
