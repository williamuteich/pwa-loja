"use client";

import { Tag, Check, ChevronDown } from "lucide-react";

const MOCK_CATEGORIES = [
    { name: "Smartphones & Tablets", selected: true },
    { name: "Eletronicos e Acessórios", selected: true },
    { name: "Computadores & Portáteis", selected: false },
    { name: "Headset & Fones de Ouvido", selected: false },
    { name: "Games & Consoles", selected: false },
];

export function ProductClassification() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="h-1 w-full bg-linear-to-r from-violet-500 to-purple-500" />
            <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-violet-500 rounded-xl flex items-center justify-center shadow-md shadow-violet-100">
                        <Tag className="w-5 h-5 text-white" />
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
                            <select className="w-full bg-slate-50 border border-slate-100 focus:border-violet-400 rounded-2xl py-4 px-5 pr-12 text-base font-bold text-slate-900 outline-none appearance-none">
                                <option>Apple</option>
                                <option>Samsung</option>
                                <option>Xiaomi</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Categorias</label>
                        <div className="flex flex-col gap-2">
                            {MOCK_CATEGORIES.map((cat) => (
                                <div
                                    key={cat.name}
                                    className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all ${cat.selected
                                            ? "bg-violet-50 border-violet-200"
                                            : "bg-slate-50 border-slate-100"
                                        }`}
                                >
                                    <span className={`text-sm ${cat.selected ? "font-black text-violet-800" : "font-bold text-slate-500"}`}>
                                        {cat.name}
                                    </span>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${cat.selected ? "bg-violet-500 border-violet-500" : "bg-white border-slate-200"
                                        }`}>
                                        {cat.selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
