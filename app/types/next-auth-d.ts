import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string;
      email?: string;
    };
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    userId?: string;
  }
}