import React from 'react';
import MenuContent from '../MenuContent/MenuContent';
import Image from 'next/image';
import { MenuItemT } from '@/type-definitions';
import { signIn, signOut, useSession } from 'next-auth/react';
import { checkSessionOnClient } from '@/app/utils/auth';
import { redirect, usePathname } from 'next/navigation';
import { HIERARCHY_ROOT_PATH } from '@/app/utils/constants';

const UserBubble = () => {
  const { data: session } = useSession();
  const relativePath = usePathname();

  const authProvider = 'custom';

  const handleSignIn = async () => {
    await signIn(authProvider, { callbackUrl: HIERARCHY_ROOT_PATH });
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const userMenu: MenuItemT[] = [];
  if (!checkSessionOnClient(session)) {
    if (relativePath !== '/') {
      redirect('/');
    }
    return (
      <>
        {/* <button
          className="btn btn-outline btn-sm font-sans"
          onClick={handleSignIn}
        >
          {'Sign in'}
        </button> */}
      </>
    );
  }

  return (
    <div className="flex flex-none flex-row">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="avatar btn btn-circle btn-md">
          <div className="w-8 rounded-full">
            <Image
              className="dark:svg-filter-dark"
              src="/svg/user2.svg"
              alt="User"
              height={8}
              width={8}
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dark:border-color-dark menu dropdown-content rounded-box menu-sm z-[100] mt-3 w-52 gap-1 bg-base-100 p-2 shadow dark:border"
        >
          <MenuContent menuItems={userMenu} />
          <li key="signOutButton" className="w-[100%]">
            <button
              className="btn btn-error btn-outline btn-sm font-sans !text-red-500 hover:!border-red-500 hover:!bg-red-100 hover:!text-red-500 active:!bg-red-300"
              onClick={handleSignOut}
            >
              {'Sign Out'}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserBubble;
