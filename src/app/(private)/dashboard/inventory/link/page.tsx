"use client"

import { ArrowLeft, Barcode, Check, QrCode, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import { Product } from "@/src/types/products/product"
import { ScannerModal } from "@/src/app/components/ScannerModal"
import { ManualInputModal } from "@/src/app/components/ManualInputModal"
import { ProductSearch } from "@/src/app/components/ProductSearch"
import { getProductsMissingInfo, updateStockProduct } from "@/src/services/stock"

export default function InventoryLinkPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 animate-pulse" />}>
            <InventoryLinkContent />
        </Suspense>
    )
}

function InventoryLinkContent() {
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const [pendingProducts, setPendingProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
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

    const search = searchParams.get("search") || ""
    const page = Number(searchParams.get("page")) || 1

    const getImageUrl = (url?: string) => {
        if (!url) return null
        if (url.startsWith('http')) return url
        const baseUrl = (session?.user as any)?.callbackUrl || ""
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
    }

    useEffect(() => {
        fetchProducts(page, search)
    }, [page, search])

    const fetchProducts = async (p: number, s: string) => {
        setLoading(true)
        const res = await getProductsMissingInfo(p, 10, s)
        
        if (res.data) {
            setPendingProducts(res.data)
            setPagination({
                page: res.meta.page,
                totalPages: res.meta.totalPages,
                total: res.meta.total
            })
        }
        setLoading(false)
    }

    const handleScan = (code: string) => {
        setScannedCode(code)
        setIsScannerOpen(false)
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
        } else {
            alert(res.error)
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
        } else {
            alert(res.error)
        }
        setUpdating(false)
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
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

                <div className="max-w-2xl mx-auto mt-6">
                    <ProductSearch />
                </div>
            </header>

            <div className="max-w-2xl mx-auto w-full px-4 mt-6 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 bg-white border-2 border-slate-100 rounded-2xl animate-pulse" />
                        ))
                    ) : pendingProducts.length > 0 ? (
                        <>
                            {pendingProducts.map((product) => (
                                <div key={product.id} className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md group transition-all">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 shadow-sm">
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
                                        <div className="flex flex-col gap-1.5 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-slate-900 text-sm leading-tight truncate">{product.title}</h3>
                                                <div className="px-1.5 py-0.5 bg-rose-50 border border-rose-200/60 rounded-md shrink-0">
                                                    <AlertCircle className="w-3 h-3 text-rose-600" />
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {!product.barcode && <span className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-200/60 px-2 py-0.5 rounded-md uppercase tracking-wide">Falta EAN</span>}
                                                {!product.sku && <span className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-200/60 px-2 py-0.5 rounded-md uppercase tracking-wide">Falta SKU</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 ml-4">
                                        <button onClick={() => { setSelectedProduct(product); setIsScannerOpen(true); }} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
                                            <QrCode className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => { setSelectedProduct(product); setIsManualInputOpen(true); }} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
                                            <Barcode className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between pt-8 border-t border-slate-200 mt-6">
                                    <Link
                                        href={`/dashboard/inventory/link?page=${Math.max(1, page - 1)}${search ? `&search=${search}` : ''}`}
                                        className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${page > 1 ? 'bg-white border-2 border-slate-100 text-slate-600 shadow-sm' : 'bg-slate-50 text-slate-300 pointer-events-none'}`}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Anterior
                                    </Link>

                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Página</span>
                                        <span className="text-sm font-black text-slate-900">{page} <span className="text-slate-300 mx-1">/</span> {pagination.totalPages}</span>
                                    </div>

                                    <Link
                                        href={`/dashboard/inventory/link?page=${Math.min(pagination.totalPages, page + 1)}${search ? `&search=${search}` : ''}`}
                                        className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${page < pagination.totalPages ? 'bg-white border-2 border-slate-100 text-slate-600 shadow-sm' : 'bg-slate-50 text-slate-300 pointer-events-none'}`}
                                    >
                                        Próxima
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <Check className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                            <h3 className="font-black text-slate-900">Tudo pronto!</h3>
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
                <div className="fixed inset-0 z-10000 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
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
