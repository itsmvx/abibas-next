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
            async authorize(credentials: Record<"username" | "password", string> | undefined) {
                const { username, password } = credentials ?? {}
                if (!username || !password) {
                    throw new Error("Missing username or password");
                }
                let existUser;
                try {
                    existUser = await prisma.users.findUnique({
                        where: {
                            username: username
                        }
                    })
                } catch (error) {
                    throw new Error('Error while connecting to Database')
                }
                if (!existUser || !(await bcrypt.compare(password, existUser.password))) {
                    throw new Error("Invalid username or password");
                }
                return {
                    id: existUser.id,
                    fullname: existUser.fullname,
                    username: existUser.username,
                    role: existUser.role_id
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 4 * 60 * 60, // 4 hours
        updateAge: 24 * 60 * 60, // 24 hours
    },
}
