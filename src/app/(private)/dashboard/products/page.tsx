import {
    ArrowLeft,
    Plus
} from "lucide-react";
import Link from "next/link";
import { getAdminProducts } from "@/src/services/product";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductSearch } from "@/src/app/components/ProductSearch";
import { ProductItem } from "@/src/app/components/ProductItem";

export default function ProductsPage({
    searchParams
}: {
    searchParams: Promise<{ page?: string; search?: string }>
}) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-100 px-4 py-6">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 active:scale-95 transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Catálogo</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gerenciar Produtos</p>
                        </div>
                    </div>
                    <Link href="/dashboard/products/new" className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 active:scale-95 transition-all">
                        <Plus className="w-6 h-6 text-white" strokeWidth={3} />
                    </Link>
                </div>
            </header>

            <div className="max-w-2xl mx-auto w-full px-4 mt-6 flex flex-col gap-6 pb-32">
                <Suspense>
                    <ProductSearch />
                </Suspense>

                <Suspense fallback={<ProductsSkeleton />}>
                    <ProductsList searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    );
}

async function ProductsList({
    searchParams
}: {
    searchParams: Promise<{ page?: string; search?: string }>
}) {
    const session = await getServerSession(auth);
    const params = await searchParams;

    const page = Number(params.page) || 1;
    const search = params.search || "";
    const backendUrl = session?.user?.callbackUrl || "";

    const { data: products, meta } = await getAdminProducts(page, 10, search);

    return (
        <div className="flex flex-col gap-3">
            {products && products.length > 0 ? (
                <>
                    {products.map((product) => (
                        <ProductItem 
                            key={product.id} 
                            product={product} 
                            backendUrl={backendUrl} 
                        />
                    ))}

                    {meta.totalPages > 1 && (
                        <div className="flex items-center justify-between pt-8 border-t border-slate-200 mt-6">
                            <Link
                                href={`/dashboard/products?page=${Math.max(1, page - 1)}${search ? `&search=${search}` : ''}`}
                                className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${page > 1 ? 'bg-white border-2 border-slate-100 text-slate-600 shadow-sm' : 'bg-slate-50 text-slate-300 pointer-events-none'}`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Anterior
                            </Link>

                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Página</span>
                                <span className="text-sm font-black text-slate-900">{page} <span className="text-slate-300 mx-1">/</span> {meta.totalPages}</span>
                            </div>

                            <Link
                                href={`/dashboard/products?page=${Math.min(meta.totalPages, page + 1)}${search ? `&search=${search}` : ''}`}
                                className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${page < meta.totalPages ? 'bg-white border-2 border-slate-100 text-slate-600 shadow-sm' : 'bg-slate-50 text-slate-300 pointer-events-none'}`}
                            >
                                Próxima
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Nenhum produto</p>
                </div>
            )}
        </div>
    );
}

import { Package } from "lucide-react";

function ProductsSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white border-2 border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm animate-pulse">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-xl"></div>
                        <div className="flex flex-col gap-2">
                            <div className="w-16 h-3 bg-slate-100 rounded-full"></div>
                            <div className="w-32 h-4 bg-slate-100 rounded-full"></div>
                            <div className="w-20 h-5 bg-slate-100 rounded-full mt-1"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
