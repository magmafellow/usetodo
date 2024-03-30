import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { pool } from "./app/lib/data";
import type { User } from "./app/lib/definitions";

async function getUser(email: string) {
  try {
    const res = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    return res.rows[0];
  } catch (error) {
    console.log("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({
          email: z.string().email(),
          password: z.string().min(3),
        }).safeParse(credentials);
        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if(!user) return null;

            const passwordsMatch = password === user.password;
            console.log('Passwords: ', passwordsMatch)
            if (passwordsMatch) return user;
        }

        console.log('Invalid credentials')
        return null;
      },
    }),
  ],
});
