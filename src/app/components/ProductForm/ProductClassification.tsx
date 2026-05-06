"use client";

import { Tag, Check, ChevronDown } from "lucide-react";
import { Product } from "@/src/types/products/product";

const MOCK_CATEGORIES = [
    { id: "1", name: "Smartphones & Tablets" },
    { id: "2", name: "Eletronicos e Acessórios" },
    { id: "3", name: "Computadores & Portáteis" },
    { id: "4", name: "Headset & Fones de Ouvido" },
    { id: "5", name: "Games & Consoles" },
];

export function ProductClassification({
    product,
    setProduct,
}: {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="h-1 w-full bg-linear-to-r from-violet-500 to-purple-500" />
            <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-violet-500 rounded-xl flex items-center justify-center shadow-md shadow-violet-100 text-white">
                        <Tag className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900">Classificação</p>
                        <p className="text-[10px] font-bold text-slate-400">Marca e categorias do produto</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Marca</label>
                        <div className="relative">
                            <select
                                value={(product.specs as any)?.brand || ""}
                                onChange={(e) => setProduct(prev => ({
                                    ...prev,
                                    specs: { ...prev.specs, brand: e.target.value }
                                }))}
                                className="w-full bg-slate-50 border border-slate-100 focus:border-violet-400 rounded-2xl py-4 px-5 pr-12 text-base font-bold text-slate-900 outline-none appearance-none"
                            >
                                <option value="">Selecionar marca...</option>
                                <option value="apple">Apple</option>
                                <option value="samsung">Samsung</option>
                                <option value="xiaomi">Xiaomi</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Categorias</label>
                        <div className="flex flex-col gap-2">
                            {MOCK_CATEGORIES.map((cat) => {
                                const isSelected = (product as any).categoryIds?.includes(cat.id);
                                return (
                                    <div
                                        key={cat.id}
                                        onClick={() => {
                                            const currentIds = (product as any).categoryIds || [];
                                            const nextIds = isSelected
                                                ? currentIds.filter((id: string) => id !== cat.id)
                                                : [...currentIds, cat.id];
                                            setProduct(prev => ({ ...prev, categoryIds: nextIds } as any));
                                        }}
                                        className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all cursor-pointer ${isSelected
                                            ? "bg-violet-50 border-violet-200"
                                            : "bg-slate-50 border-slate-100"
                                            }`}
                                    >
                                        <span className={`text-sm ${isSelected ? "font-black text-violet-800" : "font-bold text-slate-500"}`}>
                                            {cat.name}
                                        </span>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "bg-violet-500 border-violet-500" : "bg-white border-slate-200"
                                            }`}>
                                            {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
