import React from "react";
import { ProductFormSectionProps } from "@/src/types/products/product";

export const ProductPricing: React.FC<ProductFormSectionProps> = ({
    product,
    setProduct,
}) => {
    const formatBRL = (value: number | null) => {
        if (value === null) return "";
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>, field: "price" | "discountPrice") => {
        let value = e.target.value.replace(/\D/g, "");
        const numericValue = value ? parseInt(value) / 100 : 0;

        setProduct(prev => ({
            ...prev,
            [field]: field === "discountPrice" && numericValue === 0 ? null : numericValue
        }));
    };

    return (
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
                <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Precificação</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Valores de venda e promoção</p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Preço de Venda</label>
                        <div className="relative">
                            <input
                                type="text"
                                inputMode="numeric"
                                value={formatBRL(product.price)}
                                onChange={(e) => handleCurrencyChange(e, "price")}
                                placeholder="R$ 0,00"
                                className="w-full bg-emerald-50 border border-emerald-100 focus:border-emerald-400 focus:bg-white rounded-2xl py-5 px-6 text-xl font-black text-slate-900 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preço Promocional</label>
                            <span className="text-[9px] font-black bg-rose-50 text-rose-500 px-2.5 py-1 rounded-lg">Opcional</span>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                inputMode="numeric"
                                value={formatBRL(product.discountPrice)}
                                onChange={(e) => handleCurrencyChange(e, "discountPrice")}
                                placeholder="R$ 0,00"
                                className="w-full bg-rose-50 border border-rose-100 focus:border-rose-400 focus:bg-white rounded-2xl py-5 px-6 text-xl font-black text-slate-900 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
