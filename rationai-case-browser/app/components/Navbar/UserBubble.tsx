import React from 'react'
import MenuContent from '../MenuContent/MenuContent'
import Image from "next/image";
import { MenuItemT } from '@/type-definitions';
import { signIn, signOut, useSession } from 'next-auth/react';

const UserBubble = () => {
  const { data: session } = useSession()

  const authProvider = process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? "Default provider"

  const handleSignIn = async () => {
    await signIn(authProvider, { callbackUrl: '/authorized/cases/path' })
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const userMenu: MenuItemT[] = [
    {
      label: "Profile",
      link: `/authorized/${session?.userId}`,
    },
  ];
  if (!session) {
    return (
      <>
        <button className='btn btn-sm btn-outline font-sans' onClick={handleSignIn}>{"Sign in"}</button>
      </>
    )
  }

  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-circle btn-md avatar">
          <div className="w-8 rounded-full">
            <Image src="/svg/user2.svg" alt="User" height={8} width={8} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-1"
        >
          <MenuContent menuItems={userMenu} />
          <li key="signOutButton" className="w-[100%]">
            <button className='btn btn-sm btn-outline font-sans !text-red-500 hover:!text-red-500 hover:!border-red-500 hover:!bg-red-100 active:!bg-red-300 btn-error' onClick={handleSignOut}>{"Sign Out"}</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserBubble