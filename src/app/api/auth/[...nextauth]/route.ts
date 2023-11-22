import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials, req) {
        const res = await sql`
        SELECT * FROM users WHERE email=${credentials?.username};
        `;
        const user = res.rows[0];
        const isRightPass = await compare(credentials?.password ?? '', user.password);
        if (isRightPass) {
          return {
            id: user.id,
            email: user.email,
          }
        }
        return null;
      }
    }),
  ],
});

export { handler as GET, handler as POST };
