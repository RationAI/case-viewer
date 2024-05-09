import { NextAuthOptions } from "next-auth";
import { OAuthRefreshResponse, OAuthToken } from "@/type-definitions"

async function refreshAccessToken(token: OAuthToken) {
  try {
    const response = await fetch(process.env.NEXT_AUTH_TOKEN_ENDPOINT!, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.NEXT_AUTH_CLIENT_ID || "",
              client_secret: process.env.NEXT_AUTH_CLIENT_SECRET || "",
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

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SESSION_TOKEN_SECRET,
  providers: [
    {
      id: "custom",
      name: process.env.NEXT_PUBLIC_AUTH_PROVIDER_NAME || "Auth Provider",
      type: "oauth",
      wellKnown: process.env.NEXT_AUTH_OIDC_WELL_KNOWN || undefined,
      authorization: { 
        url: Boolean(process.env.NEXT_AUTH_OIDC_WELL_KNOWN) ? undefined : process.env.NEXT_AUTH_AUTHORIZATION_ENDPOINT,
        params: { scope: process.env.NEXT_AUTH_OIDC_SCOPE }
      },
      token: Boolean(process.env.NEXT_AUTH_OIDC_WELL_KNOWN) ? undefined : process.env.NEXT_AUTH_TOKEN_ENDPOINT,
      userinfo: Boolean(process.env.NEXT_AUTH_OIDC_WELL_KNOWN) ? undefined : process.env.NEXT_AUTH_USER_ENDPOINT,
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
      /* token: {
        url: process.env.NEXT_AUTH_TOKEN_ENDPOINT,
  
        async request({ client, params, checks, provider }) {
          console.log(client);
          console.log(params);
          console.log(checks);
          console.log(provider);
          const response = await client.callback(provider.callbackUrl, params, checks, {
            exchangeBody: {
              client_id: process.env.NEXT_AUTH_CLIENT_ID,
            },
          })
          console.log(response);
          return {
            tokens: response,
          }
        },
      }, */
      issuer: process.env.NEXT_AUTH_ISSUER,
      clientId: process.env.NEXT_AUTH_CLIENT_ID || "",
      clientSecret: process.env.NEXT_AUTH_CLIENT_SECRET || "",
    }
    // ...add more providers here  
  ],
  callbacks: {
    async jwt({token, user, account}) {

      // Initial sign in
      if (account && user)  {
        token.accessToken = account.access_token;
        const now = Date.now();
        token.accessTokenExpires =  ((account.expires_at! * 1000) - now) / 2 + now;
        token.refreshToken = account.refresh_token;
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
      return newTokens;
    },
    async session({session, token}) {
    if(session) {
      session.accessToken = token.accessToken as string;
      session.accessTokenExpires = token.accessTokenExpires as number;
      session.refreshToken = token.refreshToken as string;
      session.userId = token.sub;
      }
    return session
    }
  }
}