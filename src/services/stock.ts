"use server";

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
        console.error("[Service Stock] createStockMovement Error:", error);
        return { error: error.message || "Erro de conexão ao ajustar estoque" };
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

        return await res.json();
    } catch (error: any) {
        console.error("[Service Stock] getProductByIdentifier Error:", error);
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
        console.error("[Service Stock] updateStockProduct Error:", error);
        return { error: "Erro de conexão ao atualizar produto" };
    }
}

export async function getProductsMissingInfo() {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();

        const res = await fetch(`${API_URL}/api/private/stock/pending`, {
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            return { error: error.error || "Erro ao buscar produtos" };
        }

        return await res.json();
    } catch (error: any) {
        console.error("[Service Stock] getProductsMissingInfo Error:", error);
        return { error: "Erro de conexão ao buscar produtos" };
    }
}
