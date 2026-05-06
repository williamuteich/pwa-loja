"use client";

import { ImageIcon, Camera, Plus, X, UploadCloud } from "lucide-react";

const MOCK_IMAGES = [
    { isPrincipal: true },
    { isPrincipal: false },
    { isPrincipal: false },
];

export function ProductMedia() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="h-1 w-full bg-linear-to-rrom-blue-500 to-indigo-500" />
            <div className="p-5 space-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-md shadow-blue-100">
                            <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900">Fotos do Produto</p>
                            <p className="text-[10px] font-bold text-slate-400">Primeira foto = imagem principal</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                        {MOCK_IMAGES.length}/6
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {MOCK_IMAGES.map((img, i) => (
                        <div
                            key={i}
                            className={`relative aspect-square rounded-2xl overflow-hidden border-2 ${img.isPrincipal ? "border-blue-500 shadow-lg shadow-blue-50" : "border-slate-100"}`}
                        >
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-slate-300" />
                            </div>
                            {img.isPrincipal && (
                                <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-[9px] font-black uppercase text-center py-1 tracking-widest">
                                    Principal
                                </div>
                            )}
                            <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-rose-500 shadow-sm active:scale-90 transition-transform">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                    <button className="aspect-square border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform">
                        <Plus className="w-5 h-5 text-blue-500" />
                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Adicionar</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-wider active:scale-[0.98] transition-transform shadow-lg shadow-slate-200">
                        <Camera className="w-5 h-5" />
                        Câmera
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-[0.98] transition-transform">
                        <UploadCloud className="w-5 h-5" />
                        Galeria
                    </button>
                </div>
            </div>
        </div>
    );
}
