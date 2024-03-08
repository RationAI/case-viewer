import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react'

const UserPage = async () => {
  const session = await getServerSession(authOptions);
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