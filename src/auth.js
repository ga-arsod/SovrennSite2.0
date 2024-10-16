import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { env } from "process";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId:env.GOOGLE_CLIENT_ID,
      clientSecret:env.GOOGLE_SECRET_CODE,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "email profile openid",
        },
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Save the access token from the account object
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Include the access token in the session
      session.accessToken = token.accessToken;

      // Store the access token in localStorage on the client-side
      if (typeof window !== "undefined" && token.accessToken) {
        localStorage.setItem("token", token.accessToken);
      }

      return session;
    },
  },
  
});
