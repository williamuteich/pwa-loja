"use server";

import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";

async function getApiUrl() {
    const session = await getServerSession(auth);
    return (session?.user as any)?.callbackUrl || "http://localhost:3000";
}

export async function createStockMovement(data: {
    productId: string;
    type: "IN" | "OUT";
    quantity: number;
    note?: string;
}) {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/api/private/stock/movement`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            return { error: error.error || "Erro ao processar estoque" };
        }

        return await res.json();
    } catch (error: any) {
        return { error: "Erro de conexão ao processar estoque" };
    }
}

export async function getProductByIdentifier(identifier: string) {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/api/private/stock/product?identifier=${identifier}`, {
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            return { error: error.error || "Produto não encontrado" };
        }

        const result = await res.json();
        return result.data || result;
    } catch (error: any) {
        return { error: "Erro de conexão ao buscar produto" };
    }
}

export async function updateStockProduct(id: string, data: { quantity?: number, barcode?: string, sku?: string, costPrice?: number }) {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/api/private/stock/product`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify({ id, ...data }),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            return { error: error.error || "Erro ao atualizar produto" };
        }

        return await res.json();
    } catch (error: any) {
        return { error: "Erro de conexão ao atualizar produto" };
    }
}

export async function getProductsMissingInfo(page: number = 1, limit: number = 20) {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/api/private/stock/pending?page=${page}&limit=${limit}`, {
            headers: {
                Cookie: cookieStore.toString()
            },
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            return { error: "Erro ao buscar produtos" };
        }

        return await res.json();
    } catch (error: any) {
        return { error: "Erro de conexão" };
    }
}
