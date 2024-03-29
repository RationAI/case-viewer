import { NextAuthOptions } from "next-auth";
import { OAuthRefreshResponse, OAuthToken } from "@/type-definitions"
import KeycloakProvider from "next-auth/providers/keycloak"

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


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_AUTH_CLIENT_ID || "",
      clientSecret: process.env.NEXT_AUTH_SECRET || "",
      issuer: process.env.NEXT_AUTH_ISSUER,
      //client: {
      //  redirect_uris: [process.env.KEYCLOAK_REDIRECT_URI || ""]
      //},
      authorization: {
        params: {
          scope: process.env.NEXT_AUTH_OIDC_SCOPE,
        },
      },
    })
    // ...add more providers here  
  ],
  /* pages: {
    signIn: '/',
    signOut: '/',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }, */
  callbacks: {
    async jwt({token, user, account}) {

      // Initial sign in
      if (account && user)  {
        token = Object.assign({}, token, { accessToken: account.access_token });
        token = Object.assign({}, token, { accessTokenExpires: account.expires_at! * 1000 });
        token = Object.assign({}, token, { refreshToken: account.refresh_token });
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
      return await refreshAccessToken(token as OAuthToken)
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