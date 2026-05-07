"use client"

import { Barcode, X } from "lucide-react"
import { useState } from "react"

import { ManualInputModalProps } from "@/src/types/ui/modals"

export function ManualInputModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Entrada Manual",
    description = "Digite os identificadores do produto"
}: ManualInputModalProps) {
    const [ean, setEan] = useState("")
    const [sku, setSku] = useState("")

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={() => {
                        setEan("")
                        setSku("")
                        onClose()
                    }}
                    className="absolute right-6 top-6 w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 active:scale-95 transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight pr-12">
                        {title}
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                        {description}
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Código EAN</label>
                        <input
                            type="text"
                            autoFocus
                            value={ean}
                            onChange={(e) => setEan(e.target.value)}
                            placeholder="Código de barras..."
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:border-slate-900 outline-none transition-all placeholder:text-slate-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Código SKU</label>
                        <input
                            type="text"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            placeholder="Referência SKU..."
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:border-slate-900 outline-none transition-all placeholder:text-slate-300"
                        />
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            onClick={() => {
                                onConfirm(ean.trim(), sku.trim())
                                setEan("")
                                setSku("")
                            }}
                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            <Barcode className="w-5 h-5" />
                            Confirmar Dados
                        </button>
                        <button
                            onClick={() => {
                                setEan("")
                                setSku("")
                                onClose()
                            }}
                            className="w-full bg-slate-50 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-[0.98] transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
