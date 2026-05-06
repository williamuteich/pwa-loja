import React from "react";
import { Check, ChevronDown, Award } from "lucide-react";
import { Product } from "@/src/types/products/product";
import { Category } from "@/src/types/products/category";
import { Brand } from "@/src/types/products/brand";

interface ProductClassificationProps {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    categories: Category[];
    brands: Brand[];
}

export const ProductClassification: React.FC<ProductClassificationProps> = ({
    product,
    setProduct,
    categories,
    brands,
}) => {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
                <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Organização</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Categorias e marcas</p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <Award className="w-3.5 h-3.5 text-slate-400" />
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marca</label>
                        </div>
                        <div className="relative">
                            <select
                                value={product.brandId || ""}
                                onChange={(e) => setProduct(prev => ({
                                    ...prev,
                                    brandId: e.target.value
                                }))}
                                className="w-full bg-slate-50 border border-slate-100 focus:border-violet-400 rounded-2xl py-4 px-5 pr-12 text-base font-bold text-slate-900 outline-none appearance-none transition-all"
                            >
                                <option value="">Selecionar marca...</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Categorias</label>
                        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                            {categories.length === 0 ? (
                                <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nenhuma categoria encontrada</p>
                                </div>
                            ) : (
                                categories.map((cat) => {
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
                                            className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all cursor-pointer active:scale-[0.98] ${isSelected ? "bg-violet-50 border-violet-200 shadow-sm" : "bg-slate-50 border-slate-100"
                                                }`}
                                        >
                                            <span className={`text-sm ${isSelected ? "font-black text-violet-800" : "font-bold text-slate-500"}`}>
                                                {cat.name}
                                            </span>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? "bg-violet-500 border-violet-500" : "bg-white border-slate-200"
                                                }`}>
                                                {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
