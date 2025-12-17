import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "user@procure.ai" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Mock authentication for demo purposes if no database specific user found
                // In production, verify password hash
                if (credentials.email === "admin@procure.ai" && credentials.password === "admin") {
                    return { id: "1", name: "Admin", email: "admin@procure.ai", role: "Executive" };
                }

                // Check database
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (user) {
                    // In a real app, check password here
                    return { id: user.id, name: user.email, email: user.email, role: user.role };
                }

                return null;
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
