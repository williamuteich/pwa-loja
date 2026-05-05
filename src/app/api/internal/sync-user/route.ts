import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
    const secret = req.headers.get("x-pwa-sync-secret");
    const serverSecret = process.env.PWA_SYNC_SECRET;

    if (!secret || !serverSecret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isSecretValid = crypto.timingSafeEqual(
        Buffer.from(secret),
        Buffer.from(serverSecret)
    );

    if (!isSecretValid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { email, callbackUrl, pwaEnabled } = body;

        if (!email || !callbackUrl) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await prisma.user.upsert({
            where: { email },
            update: {
                callbackUrl,
                pwaEnabled: !!pwaEnabled
            },
            create: {
                email,
                callbackUrl,
                pwaEnabled: !!pwaEnabled
            }
        });

        return NextResponse.json({ success: true, user: { email: user.email } });
    } catch (error) {
        console.error("Erro na sincronização:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
