import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { encode, getToken } from 'next-auth/jwt';
import { OAuthRefreshResponse, OAuthToken } from './type-definitions';


async function refreshAccessToken(token: OAuthToken): Promise<OAuthToken> {
  try {
    const response = await fetch(process.env.KEYCLOAK_TOKEN_ENDPOINT!, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.KEYCLOAK_ID ?? "",
              // client_secret: process.env.KEYCLOAK_SECRET,
              grant_type: "refresh_token",
              refresh_token: token.refreshToken ?? "",
            }),
            method: "POST",
          })

    const refreshedTokens: OAuthRefreshResponse = await response.json()
    console.log("Refreshing token in middleware")

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + (refreshedTokens.expires_in * 1000),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const config = {
  matcher: ['/authorized/(.*)'],
};

const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

function signOut(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/', request.url));

  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.includes('next-auth.session-token')) response.cookies.delete(cookie.name);
  });

  return response;
}

function shouldUpdateToken(token: OAuthToken): boolean {
  return !(Date.now() < token.accessTokenExpires)
}

export const middleware: NextMiddleware = async (request: NextRequest) => {

  const token = await getToken({ req: request });

  console.log(token)
  console.log(Date.now())

  if (!token) return signOut(request);

  const response = NextResponse.next();

  console.log("Token check in middleware")

  if (shouldUpdateToken(token as OAuthToken)) {
    const newToken = await refreshAccessToken(token as OAuthToken);

    console.log(newToken)

    const newSessionToken = await encode({
      secret: process.env.NEXTAUTH_SECRET as string,
      token: {
        ...token,
        ...newToken,
      },
      maxAge: 30 * 24 * 60 * 60,
    });

    request.cookies.set(sessionCookie, newSessionToken)

    response.cookies.set(sessionCookie, newSessionToken)
  }

  return response;
};