import {
    ArrowLeft,
    Plus,
    Edit3,
    Trash2,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { getAdminProducts } from "@/src/services/product";
import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import { Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductSearch } from "@/src/app/components/ProductSearch";

export default function ProductsPage({
    searchParams
}: {
    searchParams: Promise<{ page?: string; search?: string }>
}) {
    return (
        <div className="flex flex-col gap-6 animate-in-view pb-32">


            <header className="flex items-center justify-between py-2 px-1">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="w-10 h-10 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition-transform">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Catálogo</h1>
                </div>
                <Link href="/dashboard/products/new" className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 active:scale-95 transition-transform">
                    <Plus className="w-6 h-6 text-white" strokeWidth={3} />
                </Link>
            </header>

            <Suspense>
                <ProductSearch />
            </Suspense>


            <Suspense fallback={<ProductsSkeleton />}>
                <ProductsList searchParams={searchParams} />
            </Suspense>

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
                products.map((product) => {
                    const stock = product.quantity || 0;
                    const hasImage = product.images && product.images.length > 0;
                    const rawUrl = product.images?.[0]?.url || "";
                    const imageUrl = hasImage
                        ? (rawUrl.startsWith('http')
                            ? rawUrl
                            : `${backendUrl.endsWith('/') ? backendUrl : backendUrl + '/'}${rawUrl.startsWith('/') ? rawUrl.slice(1) : rawUrl}`)
                        : null;

                    return (
                        <div key={product.id} className="bg-white border-2 border-slate-100 p-4 rounded-xl flex items-center justify-between active:border-blue-200 transition-colors shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-black text-slate-300 overflow-hidden">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="w-6 h-6 text-slate-300" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">
                                        {product.sku || "SEM CÓDIGO"}
                                    </span>
                                    <h3 className="font-bold text-slate-900 text-sm leading-tight max-w-[140px] truncate">{product.title}</h3>
                                    <span className="text-slate-900 font-black text-lg mt-1">
                                        R$ {Number(product.price).toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <div className="flex items-center gap-2">
                                    <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${stock > 0 || (product.variants?.reduce((acc, v) => acc + v.quantity, 0) || 0) > 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                        {stock > 0 || (product.variants?.some(v => v.quantity > 0))
                                            ? (product.variants && product.variants.length > 0
                                                ? `${product.variants.reduce((acc, v) => acc + v.quantity, 0)} un`
                                                : `${stock} un`)
                                            : "SEM ESTOQUE"
                                        }
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/dashboard/products/${product.id}/edit`} className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                                        <Edit3 className="w-4 h-4" />
                                    </Link>
                                    <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-center py-12 text-slate-500 text-sm font-medium border-2 border-dashed border-slate-200 rounded-xl">
                    Nenhum produto encontrado.
                </div>
            )}

            {meta.totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-4">
                    <Link
                        href={`/dashboard/products?page=${Math.max(1, page - 1)}${search ? `&search=${search}` : ''}`}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${page > 1 ? 'bg-white border-2 border-slate-100 text-slate-600' : 'bg-slate-50 text-slate-300 pointer-events-none'}`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                    </Link>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Página</span>
                        <span className="text-sm font-black text-slate-900">{page} <span className="text-slate-300 mx-1">/</span> {meta.totalPages}</span>
                    </div>

                    <Link
                        href={`/dashboard/products?page=${Math.min(meta.totalPages, page + 1)}${search ? `&search=${search}` : ''}`}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${page < meta.totalPages ? 'bg-white border-2 border-slate-100 text-slate-600' : 'bg-slate-50 text-slate-300 pointer-events-none'}`}
                    >
                        Próxima
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            )}

        </div>
    );
}

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
                    <div className="flex flex-col items-end gap-3">
                        <div className="w-20 h-5 bg-slate-100 rounded-lg"></div>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
                            <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
