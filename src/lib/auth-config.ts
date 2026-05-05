import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/src/lib/prisma";

export const auth: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60,
    },
    cookies: {
        sessionToken: {
            name: process.env.NODE_ENV === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            if (!user.email || !account?.id_token) return false;

            const localUser = await prisma.user.findUnique({
                where: { email: user.email }
            });

            if (!localUser || !localUser.pwaEnabled) {
                console.warn(`Usuário ${user.email} não encontrado ou sem acesso PWA.`);
                return false;
            }

            try {
                const response = await fetch(`${localUser.callbackUrl}/api/auth/pwa/validate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken: account.id_token })
                });

                const data = await response.json();

                if (data.allowed) {
                    user.id = localUser.id;
                    user.callbackUrl = localUser.callbackUrl;
                    user.role = data.role;
                    return true;
                }

                return false;
            } catch (error) {
                console.error("Erro ao validar na API da loja:", error);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.callbackUrl = user.callbackUrl;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.callbackUrl = token.callbackUrl;
                session.user.role = token.role;
            }
            return session;
        }
    }
}
