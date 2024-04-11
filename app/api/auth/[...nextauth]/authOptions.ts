import { NextAuthOptions } from "next-auth";
import { OAuthRefreshResponse, OAuthToken } from "@/type-definitions"
import KeycloakProvider from "next-auth/providers/keycloak"
import { cookies } from "next/headers";

async function refreshAccessToken(token: OAuthToken) {
  try {
    const response = await fetch(process.env.NEXT_AUTH_TOKEN_ENDPOINT!, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.NEXT_AUTH_CLIENT_ID || "",
              // client_secret: process.env.NEXT_AUTH_SECRET,
              grant_type: "refresh_token",
              refresh_token: token.refreshToken || "",
            }),
            method: "POST",
          })

    const refreshedTokens: OAuthRefreshResponse = await response.json()
    console.log("Refreshing token in callback")

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + ((refreshedTokens.expires_in / 2) * 1000),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, //  Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

const useSecureCookies = process.env.NEXTAUTH_URL!.startsWith("https://");
const hostName = useSecureCookies ? process.env.NEXTAUTH_URL!.split(".").slice(1).join(".") : process.env.NEXTAUTH_URL!;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_AUTH_CLIENT_ID || "",
      clientSecret: process.env.NEXT_AUTH_SECRET || "",
      issuer: process.env.NEXT_AUTH_ISSUER,
      authorization: {
        params: {
          scope: process.env.NEXT_AUTH_OIDC_SCOPE,
        },
      },
    })
    // ...add more providers here  
  ],
  callbacks: {
    async jwt({token, user, account}) {

      // Initial sign in
      if (account && user)  {
        token = Object.assign({}, token, { accessToken: account.access_token });
        const now = Date.now();
        token = Object.assign({}, token, { accessTokenExpires: ((account.expires_at! * 1000) - now) / 2 + now});
        token = Object.assign({}, token, { refreshToken: account.refresh_token });
        cookies().set({
          name: '_sharedEmpaiaRefreshToken',
          value: account.refresh_token!,
          httpOnly: true,
          domain: hostName,
          sameSite: "lax",
          secure: true,
        })
        console.log("Initial sign in")
        return token
      }

      console.log("Token check in JWT callback")
      // Return previous token if the access token has not expired yet
      if (Date.now() < (token as OAuthToken).accessTokenExpires) {
        console.log("Access Token still valid")
        return token
      }
      
      // Access token has expired, try to update it
      const newTokens = await refreshAccessToken(token as OAuthToken);
      /* cookies().set({
        name: '_sharedEmpaiaRefreshToken',
        value: newTokens.refreshToken!,
        httpOnly: true,
        domain: hostName,
        sameSite: "lax",
        secure: true,
      }) */
      return newTokens;
    },
    async session({session, token}) {
    if(session) {
      session = Object.assign({}, session, {accessToken: token.accessToken})
      session = Object.assign({}, session, {accessTokenExpires: token.accessTokenExpires})
      session = Object.assign({}, session, {refreshToken: token.refreshToken})
      session = Object.assign({}, session, {userId: token.sub})
      }
    return session
    }
  }
}