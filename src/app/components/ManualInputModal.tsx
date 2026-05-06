"use client"

import { Barcode } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                setEan("")
                setSku("")
                onClose()
            }
        }}>
            <DialogContent className="bg-white rounded-[32px] p-8 max-w-sm border-none shadow-2xl [&>button]:right-6 [&>button]:top-6 [&>button]:w-10 [&>button]:h-10 [&>button]:bg-slate-50 [&>button]:rounded-2xl [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:text-slate-400 [&>button]:opacity-100 [&>button]:ring-0 [&>button]:outline-none">
                <DialogHeader className="mb-4 text-left">
                    <DialogTitle className="text-xl font-black text-slate-900 tracking-tight leading-tight text-left">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 text-[10px] font-bold uppercase tracking-widest text-left mt-1">
                        {description}
                    </DialogDescription>
                </DialogHeader>

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
            </DialogContent>
        </Dialog>
    )
}
