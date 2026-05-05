import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
    const secret = req.headers.get("x-pwa-sync-secret");
    if (secret !== process.env.PWA_SYNC_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, callbackUrl, pwaEnabled } = await req.json();

    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                callbackUrl,
                pwaEnabled
            },
            create: {
                email,
                callbackUrl,
                pwaEnabled
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Erro na sincronização:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
