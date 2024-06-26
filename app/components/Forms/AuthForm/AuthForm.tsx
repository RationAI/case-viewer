'use client';

import { checkSessionOnClient } from '@/app/utils/auth';
import { HIERARCHY_ROOT_PATH } from '@/app/utils/constants';
import { signIn, signOut, useSession } from 'next-auth/react';

interface Props {
  provider: string;
}

export default function AuthForm({ provider }: Props) {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn(provider, { callbackUrl: HIERARCHY_ROOT_PATH });
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div>
      {!checkSessionOnClient(session) && (
        <>
          <button
            className="btn btn-outline btn-sm font-sans"
            onClick={handleSignIn}
          >
            {'Sign in with ' +
              (process.env.NEXT_PUBLIC_AUTH_PROVIDER_NAME || provider)}
          </button>
        </>
      )}

      {checkSessionOnClient(session) && (
        <button
          className="btn btn-outline btn-sm font-sans"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      )}
    </div>
  );
}
