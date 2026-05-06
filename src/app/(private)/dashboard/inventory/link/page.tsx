"use client"

import { ArrowLeft, Barcode, Check, Search, QrCode, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import { Product } from "@/src/types/products/product"
import { ScannerModal } from "@/src/app/components/ScannerModal"
import { ManualInputModal } from "@/src/app/components/ManualInputModal"
import { getProductsMissingInfo, updateStockProduct } from "@/src/services/stock"

export default function InventoryLinkPage() {
    const { data: session } = useSession()
    const [pendingProducts, setPendingProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isScannerOpen, setIsScannerOpen] = useState(false)
    const [scannedCode, setScannedCode] = useState<string | null>(null)
    const [isManualInputOpen, setIsManualInputOpen] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        total: 0
    })

    const getImageUrl = (url?: string) => {
        if (!url) return null
        if (url.startsWith('http')) return url
        const baseUrl = (session?.user as any)?.callbackUrl || ""
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
    }

    useEffect(() => {
        fetchProducts(1, true)
    }, [])

    const fetchProducts = async (page: number, replace: boolean = false) => {
        if (replace) setLoading(true)
        else setLoadingMore(true)

        const res = await getProductsMissingInfo(page, 20)
        
        if (res.data) {
            setPendingProducts(prev => replace ? res.data : [...prev, ...res.data])
            setPagination({
                page: res.meta.page,
                totalPages: res.meta.totalPages,
                total: res.meta.total
            })
        }
        
        setLoading(false)
        setLoadingMore(false)
    }

    const handleLoadMore = () => {
        if (pagination.page < pagination.totalPages) {
            fetchProducts(pagination.page + 1)
        }
    }

    const handleScan = (code: string) => {
        setScannedCode(code)
    }

    const handleSave = async (type: "EAN" | "SKU") => {
        if (!selectedProduct || !scannedCode) return

        setUpdating(true)
        const res = await updateStockProduct(selectedProduct.id, {
            barcode: type === "EAN" ? scannedCode : undefined,
            sku: type === "SKU" ? scannedCode : undefined
        })

        if (!res.error) {
            setPendingProducts(prev => prev.filter(p => p.id !== selectedProduct.id))
            setPagination(prev => ({ ...prev, total: prev.total - 1 }))
            setScannedCode(null)
            setSelectedProduct(null)
        }
        setUpdating(false)
    }

    const handleManualConfirm = async (ean: string, sku: string) => {
        if (!selectedProduct) return
        if (!ean && !sku) return

        setUpdating(true)
        const res = await updateStockProduct(selectedProduct.id, {
            barcode: ean || undefined,
            sku: sku || undefined
        })

        if (!res.error) {
            setPendingProducts(prev => prev.filter(p => p.id !== selectedProduct.id))
            setPagination(prev => ({ ...prev, total: prev.total - 1 }))
            setIsManualInputOpen(false)
            setSelectedProduct(null)
        }
        setUpdating(false)
    }

    const filteredProducts = pendingProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pb-10">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-100 px-4 py-6">
                <div className="max-w-2xl mx-auto flex items-center gap-4">
                    <Link href="/dashboard" className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 active:scale-95 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Vincular Produtos</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pagination.total} itens pendentes</p>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto mt-6 relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar produto por nome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-6 text-slate-900 font-bold focus:border-slate-900 outline-none transition-all placeholder:text-slate-300"
                    />
                </div>
            </header>

            <div className="max-w-2xl mx-auto w-full px-4 mt-6">
                <div className="flex flex-col gap-3">
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 bg-white border-2 border-slate-100 rounded-2xl animate-pulse" />
                        ))
                    ) : filteredProducts.length > 0 ? (
                        <>
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white border-2 border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-sm group transition-all">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                                            {product.images && product.images.length > 0 ? (
                                                <img
                                                    src={getImageUrl(product.images[0].url) || ""}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <QrCode className="w-6 h-6 opacity-50" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-black text-slate-900 text-sm truncate">{product.title}</h3>
                                                <div className="px-1.5 py-0.5 bg-rose-50 rounded-md shrink-0">
                                                    <AlertCircle className="w-3 h-3 text-rose-500" />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {!product.barcode && <span className="text-[9px] font-black bg-slate-50 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">Falta EAN</span>}
                                                {!product.sku && <span className="text-[9px] font-black bg-slate-50 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">Falta SKU</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 ml-4">
                                        <button onClick={() => { setSelectedProduct(product); setIsScannerOpen(true); }} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white active:scale-95 transition-all shadow-sm">
                                            <QrCode className="w-6 h-6" />
                                        </button>
                                        <button onClick={() => { setSelectedProduct(product); setIsManualInputOpen(true); }} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white active:scale-95 transition-all shadow-sm">
                                            <Barcode className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {pagination.page < pagination.totalPages && (
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                >
                                    {loadingMore ? <Loader2 className="w-4 h-4 animate-spin" /> : "Carregar Mais"}
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <Check className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                            <h3 className="font-black text-slate-900">Tudo em ordem!</h3>
                            <p className="text-slate-400 text-xs">Nenhum produto pendente de identificação.</p>
                        </div>
                    )}
                </div>
            </div>

            <ScannerModal
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={handleScan}
            />

            <ManualInputModal
                isOpen={isManualInputOpen}
                onClose={() => setIsManualInputOpen(false)}
                onConfirm={handleManualConfirm}
                title="Vincular Manual"
                description={`Defina os códigos para ${selectedProduct?.title}`}
            />

            {scannedCode && selectedProduct && (
                <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl mx-auto flex items-center justify-center border border-slate-100 mb-6">
                                <Barcode className="w-10 h-10 text-slate-900" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-2">Código Identificado</h3>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter mb-2">{scannedCode}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Para {selectedProduct.title}</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => handleSave("EAN")} disabled={updating} className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-[0.98] transition-all">
                                    Salvar como EAN
                                </button>
                                <button onClick={() => handleSave("SKU")} disabled={updating} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-[0.98] transition-all">
                                    Salvar como SKU
                                </button>
                                <button onClick={() => setScannedCode(null)} className="w-full bg-slate-50 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-[0.98]">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
