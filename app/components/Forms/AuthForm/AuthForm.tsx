'use client';

import { checkSessionOnClient } from '@/app/utils/auth';
import { signIn, signOut, useSession } from 'next-auth/react';

interface Props {
  provider: string;
}

export default function AuthForm({ provider }: Props) {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn(provider, { callbackUrl: '/authorized/cases/path' })
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div>
      {!checkSessionOnClient(session) && (
        <>
          <button className='btn btn-sm btn-outline font-sans' onClick={handleSignIn}>{"Sign in with " + provider }</button>
        </>
      )}

      {checkSessionOnClient(session) && <button className='btn btn-sm btn-outline font-sans' onClick={handleSignOut}>Sign out</button>}
      {/* <div className='break-words'>{JSON.stringify(session) ?? ""}</div> */}
    </div>
  );
}