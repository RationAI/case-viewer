'use client'

import { useSession } from 'next-auth/react';
import React from 'react'

const UserPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div>UserPage</div>
      <div>
        {JSON.stringify(session?.accessToken)}
      </div>
    </div>
  )
}

export default UserPage