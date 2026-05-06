import React from "react";
import { Plus, Trash2, Box } from "lucide-react";
import { ProductFormSectionProps } from "@/src/types/products/product";

export const ProductVariants: React.FC<ProductFormSectionProps> = ({
    product,
    setProduct,
}) => {
    const variants = product.variants || [];

    const addVariant = () => {
        setProduct(prev => ({
            ...prev,
            variants: [
                ...(prev.variants || []),
                { id: `var-${Date.now()}`, name: "", color: "#000000", stock: 0 } as any
            ]
        }));
    };

    const updateVariant = (index: number, field: string, value: any) => {
        const currentVariants = product.variants || [];
        const newVariants = [...currentVariants];

        let finalValue = value;
        if (field === "stock") {
            finalValue = Math.max(0, parseInt(value) || 0);
        }

        newVariants[index] = { ...newVariants[index], [field]: finalValue };
        setProduct(prev => ({ ...prev, variants: newVariants }));
    };

    const removeVariant = (index: number) => {
        const currentVariants = product.variants || [];
        setProduct(prev => ({
            ...prev,
            variants: currentVariants.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Cores e Variantes</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Gerenciamento de opções</p>
                    </div>
                    <button
                        type="button"
                        onClick={addVariant}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-wider active:scale-95 transition-transform shadow-md shadow-rose-100"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    {variants.map((v: any, i: number) => (
                        <div key={v.id || i} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={v.color || "#000000"}
                                        onChange={(e) => updateVariant(i, "color", e.target.value)}
                                        className="w-10 h-10 rounded-xl border-2 border-white shadow-md shrink-0 cursor-pointer overflow-hidden p-0"
                                    />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 font-mono uppercase">{v.color || "#000000"}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeVariant(i)}
                                    className="w-10 h-10 bg-white border border-slate-200 text-rose-400 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <input
                                type="text"
                                value={v.name || ""}
                                onChange={(e) => updateVariant(i, "name", e.target.value)}
                                placeholder="Ex: Titânio Preto"
                                className="w-full bg-white border border-slate-200 focus:border-rose-400 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 outline-none transition-all"
                            />

                            <div className="relative">
                                <Box className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                <input
                                    type="number"
                                    min="0"
                                    value={v.stock || ""}
                                    onChange={(e) => updateVariant(i, "stock", e.target.value)}
                                    placeholder="Quantidade em estoque"
                                    className="w-full bg-white border border-slate-200 focus:border-rose-400 rounded-xl py-3 pl-11 pr-4 text-sm font-black text-slate-900 outline-none transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total variantes</span>
                    <span className="text-lg font-black text-slate-900">
                        {variants.reduce((acc: number, curr: any) => acc + (curr.stock || 0), 0)} und.
                    </span>
                </div>
            </div>
        </div>
    );
};
