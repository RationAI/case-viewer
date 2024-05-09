import { getSession } from 'next-auth/react';

export const openXOpat = async (visualization: object) => {
  const session = await getSession();

  const xOpatUrl = process.env.NEXT_PUBLIC_XOPAT_URL || '';
  const method = process.env.NEXT_PUBLIC_XOPAT_OPEN_METHOD || 'GET';

  const useSecureCookies =
    !process.env.NEXT_PUBLIC_ORIGIN!.includes('localhost');
  const fullHost = new URL(process.env.NEXT_PUBLIC_ORIGIN!).hostname;
  const hostName = useSecureCookies
    ? fullHost.split('.').slice(1).join('.')
    : 'localhost';

  if (method === 'GET') {
    const newCookie = `_sharedEmpaiaRefreshToken=${session?.refreshToken}; domain=${hostName}; path=/; SameSite=Lax; Secure`;
    document.cookie = newCookie;
    window.open(
      encodeURI(`${xOpatUrl}/index.php#${JSON.stringify(visualization)}`),
      '_blank',
    );
  }
  // TODO implement POST alternative
};
