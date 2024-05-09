import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

export const noAuthActive = ['true', '1', 't'].includes(
  (process.env.NEXT_PUBLIC_NO_AUTH || 'false').toLowerCase(),
);

export const checkSessionOnServer = async () => {
  if (noAuthActive) return true;

  const session = await getServerSession(authOptions);

  return session && session.user;
};

export const checkSessionOnClient = (session: Session | null) => {
  return noAuthActive || session !== null;
};
