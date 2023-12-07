import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"

export const options: NextAuthOptions = {
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { username, password } = credentials ?? {}
                if (!username || !password) {
                    throw new Error("Missing username or password");
                }
                const existUser = await prisma.users.findUnique({
                    where: {
                        username: username
                    }
                })
                if (!existUser || !(await bcrypt.compare(password, existUser.password))) {
                    throw new Error("Invalid username or password");
                }
                return existUser;
            },
        }),
    ],
}
