import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByName } from "db";
import bcrypt from "bcrypt";

type Session = {
    id: number;
    name: string;
    role: string;
};

export const authOptions = {
    session: {
        maxAge: 60 * 60 * 24 * 2,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    providers: [
        //@ts-ignore
        CredentialsProvider({
            //@ts-ignore
            async authorize(credentials, req): Session {
                if (!credentials.username) return null;
                // Add logic here to look up the user from the credentials supplied

                const user = await getUserByName(credentials.username);
                if (await bcrypt.compare(credentials.password, user.password)) {
                    // Any object returned will be saved in `user` property of the JWT
                    const userSession = {
                        id: user.id,
                        name: user.name,
                        role: user.role,
                    };
                    return userSession;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
};
export default NextAuth(authOptions);
