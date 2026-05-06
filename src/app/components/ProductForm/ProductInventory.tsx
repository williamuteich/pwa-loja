import React, { useState } from "react";
import { Barcode, Box, Scan, Hash } from "lucide-react";
import { ScannerModal } from "@/src/app/components/ScannerModal";
import { ProductInventoryProps } from "@/src/types/products/product";

export const ProductInventory: React.FC<ProductInventoryProps> = ({
    product,
    setProduct,
}) => {
    const hasVariants = (product.variants || []).length > 0;
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [scanTarget, setScanTarget] = useState<"EAN" | "SKU">("EAN");

    const openScanner = (target: "EAN" | "SKU") => {
        setScanTarget(target);
        setIsScannerOpen(true);
    };

    const handleScan = (code: string) => {
        if (scanTarget === "EAN") {
            setProduct(prev => ({ ...prev, barcode: code }));
        } else {
            setProduct(prev => ({ ...prev, sku: code }));
        }
        setIsScannerOpen(false);
    };

    return (
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
                <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Estoque & Identificação</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Código e quantidade em estoque</p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Código EAN (Barras)</label>
                            <div className="relative">
                                <Barcode className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                                <input
                                    type="text"
                                    value={product.barcode || ""}
                                    onChange={(e) => setProduct(prev => ({ ...prev, barcode: e.target.value }))}
                                    placeholder="Leia ou digite o EAN"
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-amber-400 focus:bg-white rounded-2xl py-4 pl-14 pr-16 text-base font-bold text-slate-900 outline-none transition-all tracking-widest"
                                />
                                <button
                                    type="button"
                                    onClick={() => openScanner("EAN")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 active:scale-90 transition-transform shadow-sm"
                                >
                                    <Scan className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Código SKU</label>
                            <div className="relative">
                                <Hash className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                                <input
                                    type="text"
                                    value={product.sku || ""}
                                    onChange={(e) => setProduct(prev => ({ ...prev, sku: e.target.value }))}
                                    placeholder="Ex: ABC-123-XYZ"
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-blue-400 focus:bg-white rounded-2xl py-4 pl-14 pr-16 text-base font-bold text-slate-900 outline-none transition-all tracking-widest"
                                />
                                <button
                                    type="button"
                                    onClick={() => openScanner("SKU")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 active:scale-90 transition-transform shadow-sm"
                                >
                                    <Scan className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {!hasVariants && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Quantidade em Estoque</label>
                            <div className="relative">
                                <Box className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                                <input
                                    type="number"
                                    min="0"
                                    value={product.quantity || ""}
                                    onChange={(e) => {
                                        const val = Math.max(0, parseInt(e.target.value) || 0);
                                        setProduct(prev => ({ ...prev, quantity: val }));
                                    }}
                                    className="w-full bg-amber-50 border border-amber-100 focus:border-amber-400 focus:bg-white rounded-2xl py-4 pl-14 pr-5 text-2xl font-black text-slate-900 outline-none transition-all"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ScannerModal
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={handleScan}
            />
        </div>
    );
};
