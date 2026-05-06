"use client";

import { AlignLeft, Type } from "lucide-react";
import { Product } from "@/src/types/products/product";

export function ProductInfo({
    product,
    setProduct,
}: {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="h-1 w-full bg-linear-to-r from-indigo-500 to-violet-500" />
            <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-indigo-100 text-white">
                        <Type className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900">Informações do Produto</p>
                        <p className="text-[10px] font-bold text-slate-400">Título e descrição comercial</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Título</label>
                        <input
                            type="text"
                            value={product.title || ""}
                            onChange={(e) => setProduct(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Ex: iPhone 15 Pro Max 256GB"
                            className="w-full bg-slate-50 border border-slate-100 focus:border-indigo-400 focus:bg-white rounded-2xl py-4 px-5 text-base font-bold text-slate-900 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Descrição Detalhada</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                            <textarea
                                rows={5}
                                value={product.description || ""}
                                onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Descreva os detalhes e benefícios do produto..."
                                className="w-full bg-slate-50 border border-slate-100 focus:border-indigo-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-slate-700 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
