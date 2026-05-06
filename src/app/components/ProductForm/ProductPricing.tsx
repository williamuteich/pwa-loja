"use client";

import { DollarSign, Tag, TrendingUp } from "lucide-react";
import { Product } from "@/src/types/products/product";

export function ProductPricing({
    product,
    setProduct,
}: {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="h-1 w-full bg-linear-to-r from-emerald-400 to-teal-500" />
            <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md shadow-emerald-100 text-white">
                        <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900">Precificação</p>
                        <p className="text-[10px] font-bold text-slate-400">Valores de venda e promoção</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Preço de Venda</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-emerald-500 text-base">R$</span>
                            <input
                                type="number"
                                value={product.price || ""}
                                onChange={(e) => setProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                                placeholder="0,00"
                                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-2xl py-5 pl-14 pr-5 text-xl font-black text-slate-900 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preço Promocional</label>
                            <span className="text-[9px] font-black bg-rose-50 text-rose-500 px-2.5 py-1 rounded-lg">Opcional</span>
                        </div>
                        <div className="relative">
                            <Tag className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
                            <input
                                type="number"
                                value={product.discountPrice || ""}
                                onChange={(e) => setProduct(prev => ({ ...prev, discountPrice: parseFloat(e.target.value) || null }))}
                                placeholder="0,00"
                                className="w-full bg-rose-50 border border-rose-100 focus:border-rose-400 focus:bg-white rounded-2xl py-5 pl-14 pr-5 text-xl font-black text-slate-900 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
