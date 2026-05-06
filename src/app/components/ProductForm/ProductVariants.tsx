"use client";

import { Palette, Plus, Trash2, Box } from "lucide-react";

const MOCK_VARIANTS = [
    { color: "#1a1a2e", hex: "#1A1A2E", name: "Titânio Preto", stock: 12 },
    { color: "#f0f0f0", hex: "#F0F0F0", name: "Titânio Natural", stock: 18 },
    { color: "#c0b8a8", hex: "#C0B8A8", name: "Titânio Deserto", stock: 7 },
];

export function ProductVariants() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="h-1 w-full bg-linear-to-r from-pink-500 to-rose-500" />
            <div className="p-5 space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-rose-500 rounded-xl flex items-center justify-center shadow-md shadow-rose-100">
                            <Palette className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900">Cores e Variantes</p>
                            <p className="text-[10px] font-bold text-slate-400">Opcional</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-wider active:scale-95 transition-transform shadow-md shadow-rose-100">
                        <Plus className="w-4 h-4" />
                        Adicionar
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    {MOCK_VARIANTS.map((v, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-xl border-2 border-white shadow-md shrink-0"
                                        style={{ backgroundColor: v.color }}
                                    />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 font-mono uppercase">{v.hex}</p>
                                    </div>
                                </div>
                                <button className="w-10 h-10 bg-white border border-slate-200 text-rose-400 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <input
                                type="text"
                                defaultValue={v.name}
                                placeholder="Nome da cor..."
                                className="w-full bg-white border border-slate-200 focus:border-rose-400 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 outline-none transition-all"
                            />

                            <div className="relative">
                                <Box className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                <input
                                    type="number"
                                    defaultValue={v.stock}
                                    placeholder="Estoque"
                                    className="w-full bg-white border border-slate-200 focus:border-rose-400 rounded-xl py-3 pl-11 pr-4 text-sm font-black text-slate-900 outline-none transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between px-5 py-4 bg-slate-900 rounded-2xl">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total em estoque</span>
                    <span className="text-lg font-black text-white">37 und.</span>
                </div>
            </div>
        </div>
    );
}
