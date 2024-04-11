import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak"

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
}