"use client";

import { Barcode, Box, Scan } from "lucide-react";

export function ProductInventory() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="h-1 w-full bg-linear-to-r from-amber-400 to-orange-500" />
            <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shadow-md shadow-amber-100">
                        <Box className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900">Estoque & Identificação</p>
                        <p className="text-[10px] font-bold text-slate-400">Código e quantidade em estoque</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Código EAN / SKU</label>
                        <div className="relative">
                            <Barcode className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                            <input
                                type="text"
                                defaultValue="MQ9T3BZ/A"
                                className="w-full bg-amber-50 border border-amber-100 focus:border-amber-400 focus:bg-white rounded-2xl py-4 pl-14 pr-16 text-base font-bold text-slate-900 outline-none transition-all tracking-widest"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 active:scale-90 transition-transform shadow-sm">
                                <Scan className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Quantidade em Estoque</label>
                        <div className="relative">
                            <Box className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                            <input
                                type="number"
                                defaultValue="42"
                                className="w-full bg-amber-50 border border-amber-100 focus:border-amber-400 focus:bg-white rounded-2xl py-4 pl-14 pr-5 text-2xl font-black text-slate-900 outline-none transition-all"
                            />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 italic px-1">
                            Estoque geral — gerenciado pelas variantes quando definidas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
