"use server";

import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { Product, ProductsResponse } from "@/src/types/products/product";

async function getApiUrl() {
    const session = await getServerSession(auth);
    if (!session?.user?.callbackUrl) {
        throw new Error("Sessão inválida ou callbackUrl não definido");
    }
    return session.user.callbackUrl;
}

export async function getBackendUrl() {
    try {
        return await getApiUrl();
    } catch {
        return "";
    }
}

export async function getAdminProducts(page: number = 1, limit: number = 10, search: string = "", hasDiscount?: boolean, isActive?: boolean): Promise<ProductsResponse> {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();
        const url = new URL(`${API_URL}/api/private/product`);
        url.searchParams.set("page", page.toString());
        url.searchParams.set("limit", limit.toString());
        if (search) url.searchParams.set("search", search);
        if (hasDiscount !== undefined) url.searchParams.set("hasDiscount", hasDiscount.toString());
        if (isActive !== undefined) url.searchParams.set("isActive", isActive.toString());

        const res = await fetch(url.toString(), {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString()
            }
        });
        if (!res.ok) throw new Error("Failed to fetch admin products");

        return await res.json();
    } catch (error) {
        console.error("[Service Product] getAdminProducts Error:", error);
        return { data: [], meta: { total: 0, page, limit, totalPages: 0 } };
    }
}

export async function getAdminProductById(id: string): Promise<Product | null> {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/api/private/product/${id}`, {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString()
            }
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("[Service Product] getAdminProductById Error:", error);
        return null;
    }
}

export async function createProduct(formData: FormData): Promise<{ data?: Product; error?: string }> {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/api/private/product`, {
            method: "POST",
            headers: {
                Cookie: cookieStore.toString()
            },
            body: formData,
        });

        if (!res.ok) {
            if (res.status === 403) return { error: "Sem permissão para realizar esta ação. Contate o administrador." };
            const error = await res.json().catch(() => ({}));
            return { error: error.error || error.message || "Falha ao criar produto" };
        }

        return { data: await res.json() };
    } catch (error: any) {
        console.error("[Service Product] createProduct Error:", error);
        return { error: error.message || "Erro de conexão ao criar produto" };
    }
}

export async function updateProduct(id: string, formData: FormData): Promise<{ data?: Product; error?: string }> {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/api/private/product/${id}`, {
            method: "PATCH",
            headers: {
                Cookie: cookieStore.toString()
            },
            body: formData,
        });

        if (!res.ok) {
            if (res.status === 403) return { error: "Sem permissão para realizar esta ação. Contate o administrador." };
            const error = await res.json().catch(() => ({}));
            return { error: error.error || error.message || "Falha ao atualizar produto" };
        }

        return { data: await res.json() };
    } catch (error: any) {
        console.error("[Service Product] updateProduct Error:", error);
        return { error: error.message || "Erro de conexão ao atualizar produto" };
    }
}

export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const API_URL = await getApiUrl();
        const cookieStore = await cookies();
        const res = await fetch(`${API_URL}/api/private/product/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieStore.toString()
            },
        });

        if (!res.ok) {
            if (res.status === 403) return { success: false, error: "Sem permissão para realizar esta ação. Contate o administrador." };
            const error = await res.json().catch(() => ({}));
            return { success: false, error: error.error || error.message || "Falha ao excluir produto" };
        }

        return { success: true };
    } catch (error: any) {
        console.error("[Service Product] deleteProduct Error:", error);
        return { success: false, error: error.message || "Erro de conexão ao excluir produto" };
    }
}
