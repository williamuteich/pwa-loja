"use client"

import {
    Package,
    Plus,
    Minus,
    Check,
    X,
    AlertCircle
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { useSession } from "next-auth/react"
import { createStockMovement, getProductByIdentifier } from "@/src/services/stock"
import { Product } from "@/src/types/products/product"
import { UnifiedScanner } from "@/src/app/components/UnifiedScanner"

export default function ScanPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const [scannedProduct, setScannedProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(false)
    const [adjustmentMode, setAdjustmentMode] = useState<"IN" | "OUT" | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [note, setNote] = useState("")
    const [status, setStatus] = useState<{ type: "success" | "error", message: string } | null>(null)
    const scanLockRef = useRef(false)

    const getImageUrl = (url?: string) => {
        if (!url) return null
        if (url.startsWith('http')) return url
        const baseUrl = (session?.user as any)?.callbackUrl || ""
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
    }

    const handleScan = async (code: string) => {
        if (scanLockRef.current) return;
        scanLockRef.current = true;

        setLoading(true)
        const product = await getProductByIdentifier(code)
        if (product && !product.error) {
            setScannedProduct(product)
            setStatus({ type: "success", message: "Produto identificado" })
        } else {
            setStatus({ type: "error", message: "Produto não encontrado" })
            setTimeout(() => {
                setStatus(null);
                scanLockRef.current = false;
            }, 3000)
        }
        setLoading(false)
    }

    const resetScan = () => {
        setScannedProduct(null)
        setAdjustmentMode(null)
        setQuantity(1)
        setStatus(null)
        scanLockRef.current = false
    }

    const handleApplyAdjustment = async () => {
        if (!scannedProduct || !adjustmentMode) return

        setLoading(true)
        const res = await createStockMovement({
            productId: scannedProduct.id,
            type: adjustmentMode,
            quantity: quantity,
            note: note || `Ajuste PWA: ${adjustmentMode}`
        })

        if (!res.error) {
            setStatus({ type: "success", message: "Estoque atualizado!" })
            setTimeout(() => {
                resetScan()
            }, 1500)
        } else {
            setStatus({ type: "error", message: res.error })
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col min-h-screen bg-black overflow-hidden relative text-white">
            {!scannedProduct && (
                <UnifiedScanner
                    onScan={handleScan}
                    onClose={() => router.back()}
                    title="Ajuste de Estoque"
                    isPage={true}
                />
            )}

            {scannedProduct && (
                <div className="relative z-50 flex flex-col h-screen p-4">
                    <div className="flex-1"></div>
                    <div className="space-y-3 pb-8">
                        {status && (
                            <div className={`p-4 rounded-2xl flex items-center gap-3 bg-white shadow-2xl animate-in slide-in-from-bottom-2 ${status.type === 'success' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                {status.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                <span className="text-xs font-black uppercase tracking-tight">{status.message}</span>
                            </div>
                        )}

                        {!adjustmentMode ? (
                            <div className="bg-white p-6 rounded-[32px] flex flex-col gap-6 shadow-2xl animate-in slide-in-from-bottom-10 border-4 border-emerald-500/20 backdrop-blur-xl mx-2">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-32 h-32 rounded-3xl bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden shadow-sm mb-4">
                                        {scannedProduct.images && scannedProduct.images.length > 0 ? (
                                            <img
                                                src={getImageUrl(scannedProduct.images[0].url) || ""}
                                                alt={scannedProduct.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Package className="w-12 h-12 text-slate-300" />
                                        )}
                                    </div>
                                    <span className="text-[10px] font-black uppercase bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100 tracking-widest mb-2">{scannedProduct.sku || "PRODUTO IDENTIFICADO"}</span>
                                    <h3 className="font-black text-slate-900 text-xl leading-tight mb-2">{scannedProduct.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Estoque Atual:</span>
                                        <p className="text-2xl font-black text-slate-900 leading-none">{scannedProduct.quantity || 0} <span className="text-xs text-slate-400 uppercase tracking-tighter">UN</span></p>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-2">
                                    <button
                                        onClick={resetScan}
                                        className="flex-1 bg-slate-50 text-slate-400 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all border border-slate-100"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => setAdjustmentMode("IN")}
                                        className="flex-2 bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all"
                                    >
                                        Ajustar Estoque
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-6 rounded-[32px] shadow-2xl animate-in slide-in-from-bottom-20 border-4 border-slate-900/10">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                                        Ajuste: {adjustmentMode === "IN" ? "Entrada" : "Saída"}
                                    </h2>
                                    <button onClick={() => setAdjustmentMode(null)} className="p-2 bg-slate-50 rounded-xl text-slate-400">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center active:scale-90 transition-all">
                                        <Minus className="w-6 h-6 text-slate-900" strokeWidth={3} />
                                    </button>
                                    <span className="text-5xl font-black text-slate-900">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white active:scale-90 transition-all shadow-xl">
                                        <Plus className="w-6 h-6" strokeWidth={3} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <button onClick={() => setAdjustmentMode("IN")} className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${adjustmentMode === "IN" ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-50 text-slate-400"}`}>Entrada</button>
                                    <button onClick={() => setAdjustmentMode("OUT")} className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${adjustmentMode === "OUT" ? "bg-rose-500 text-white shadow-lg" : "bg-slate-50 text-slate-400"}`}>Saída</button>
                                </div>

                                <button onClick={handleApplyAdjustment} disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">
                                    {loading ? "Processando..." : "Confirmar Estoque"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
