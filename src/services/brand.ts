"use server";

import { Brand, BrandsResponse } from "@/src/types/products/brand";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";

async function getApiUrl() {
    const session = await getServerSession(auth);
    if (!session?.user?.callbackUrl) {
        throw new Error("Sessão inválida ou callbackUrl não definido");
    }
    return session.user.callbackUrl;
}

export async function getAdminBrands(page: number = 1, limit: number = 100): Promise<BrandsResponse> {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();
        const url = new URL(`${API_URL}/api/private/brand`);
        url.searchParams.set("page", page.toString());
        url.searchParams.set("limit", limit.toString());

        const res = await fetch(url.toString(), {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString()
            }
        });
        if (!res.ok) throw new Error("Failed to fetch admin brands");
        return await res.json();
    } catch (error) {
        console.error("[Service Brand] getAdminBrands Error:", error);
        return { data: [], meta: { total: 0, page, limit, totalPages: 0 } };
    }
}
