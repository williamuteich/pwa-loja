import React from "react";
import { Eye, Globe, Settings } from "lucide-react";
import { Product } from "@/src/types/products/product";

interface ProductVisibilityProps {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export const ProductVisibility: React.FC<ProductVisibilityProps> = ({
    product,
    setProduct,
}) => {
    const specsString = typeof product.specs === 'string'
        ? product.specs
        : Object.entries(product.specs || {})
            .filter(([key]) => key !== 'brand')
            .map(([key, val]) => `${key}: ${val}`)
            .join(", ");

    const handleSpecsChange = (value: string) => {
        setProduct(prev => ({ ...prev, specs: value as any }));
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="h-1 w-full bg-linear-to-r from-emerald-400 to-green-500" />
            <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md shadow-emerald-100 text-white">
                        <Eye className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900">Visibilidade</p>
                        <p className="text-[10px] font-bold text-slate-400">Status e ficha técnica</p>
                    </div>
                </div>

                <div
                    onClick={() => setProduct(prev => ({ ...prev, isActive: !prev.isActive }))}
                    className="flex items-center justify-between p-5 bg-slate-900 rounded-2xl cursor-pointer active:scale-[0.98] transition-all"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${product.isActive ? "bg-emerald-500" : "bg-slate-700"}`}>
                            <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white">{product.isActive ? "Online na Loja" : "Offline / Rascunho"}</p>
                            <p className={`text-[10px] font-bold ${product.isActive ? "text-emerald-400" : "text-slate-500"}`}>
                                {product.isActive ? "Disponível agora" : "Oculto para clientes"}
                            </p>
                        </div>
                    </div>
                    <div className={`w-14 h-8 rounded-full relative transition-colors border-2 ${product.isActive ? "bg-emerald-500 border-emerald-400/30" : "bg-slate-700 border-slate-600"}`}>
                        <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all ${product.isActive ? "right-0.5" : "left-0.5"}`} />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                        <Settings className="w-4 h-4 text-slate-400" />
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Especificações Técnicas</label>
                    </div>
                    <textarea
                        rows={5}
                        value={specsString}
                        onChange={(e) => handleSpecsChange(e.target.value)}
                        placeholder="Ex: RAM: 8GB, Tela: 6.7 OLED..."
                        className="w-full bg-slate-50 border border-slate-100 focus:border-emerald-400 focus:bg-white rounded-2xl py-4 px-5 text-sm font-medium text-slate-700 outline-none transition-all resize-none"
                    />
                </div>
            </div>
        </div>
    );
};
