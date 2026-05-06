"use client";

import { Eye, Globe, Settings } from "lucide-react";

export function ProductVisibility() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="h-1 w-full bg-linear-to-r from-emerald-400 to-green-500" />
            <div className="p-5 space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md shadow-emerald-100">
                        <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-900">Visibilidade</p>
                        <p className="text-[10px] font-bold text-slate-400">Status e ficha técnica</p>
                    </div>
                </div>

                <div className="flex items-center justify-between p-5 bg-slate-900 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
                            <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white">Online na Loja</p>
                            <p className="text-[10px] font-bold text-emerald-400">Disponível agora</p>
                        </div>
                    </div>
                    <div className="w-14 h-8 bg-emerald-500 rounded-full relative cursor-pointer border-2 border-emerald-400/30">
                        <div className="absolute top-0.5 right-0.5 w-6 h-6 bg-white rounded-full shadow-md" />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                        <Settings className="w-4 h-4 text-slate-400" />
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Especificações Técnicas</label>
                    </div>
                    <textarea
                        rows={5}
                        defaultValue="Chip: A17 Pro, RAM: 8GB, Armazenamento: 256GB, Câmera: 48MP, Bateria: 4422mAh, Tela: 6.7&quot; OLED"
                        className="w-full bg-slate-50 border border-slate-100 focus:border-emerald-400 focus:bg-white rounded-2xl py-4 px-5 text-sm font-medium text-slate-700 outline-none transition-all resize-none"
                    />
                    <p className="text-[10px] font-bold text-slate-400 italic px-1">
                        Dica: Use o formato Chave: Valor, separado por vírgulas.
                    </p>
                </div>
            </div>
        </div>
    );
}
