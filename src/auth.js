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
  
 
  
});
