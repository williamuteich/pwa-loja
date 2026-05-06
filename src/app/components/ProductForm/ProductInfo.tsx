import React from "react";
import { AlignLeft } from "lucide-react";
import { ProductInfoProps } from "@/src/types/products/product";

export const ProductInfo: React.FC<ProductInfoProps> = ({
    product,
    setProduct,
}) => {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
                <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Informações do Produto</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Título e descrição comercial</p>
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
