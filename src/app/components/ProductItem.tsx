"use client"

import { Edit3, Trash2, Image as ImageIcon, Barcode, Hash } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { deleteProduct } from "@/src/services/product"
import { ConfirmModal } from "./ConfirmModal"
import { ProductItemProps } from "@/src/types/products/product"

export function ProductItem({ product, backendUrl }: ProductItemProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    const stock = product.quantity || 0
    const hasImage = product.images && product.images.length > 0
    const rawUrl = product.images?.[0]?.url || ""
    const imageUrl = hasImage
        ? (rawUrl.startsWith('http')
            ? rawUrl
            : `${backendUrl.endsWith('/') ? backendUrl : backendUrl + '/'}${rawUrl.startsWith('/') ? rawUrl.slice(1) : rawUrl}`)
        : null

    const handleDelete = async () => {
        setIsDeleting(true)
        const res = await deleteProduct(product.id)
        if (res.success) {
            setIsVisible(false)
        }
        setIsConfirmOpen(false)
        setIsDeleting(false)
    }

    if (!isVisible) return null

    return (
        <div className="bg-white border border-slate-100 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-all gap-4 group">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-black text-slate-300 overflow-hidden shadow-sm shrink-0">
                    {imageUrl ? (
                        <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                    )}
                </div>
                <div className="flex flex-col">
                    <h3 className="font-bold text-slate-900 text-sm leading-tight max-w-[180px] md:max-w-xs truncate">{product.title}</h3>

                    <div className="flex flex-wrap gap-1.5 mt-1 mb-1.5">
                        {product.barcode ? (
                            <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200/60 uppercase tracking-wide flex items-center gap-1">
                                <Barcode className="w-3 h-3" /> {product.barcode}
                            </span>
                        ) : (
                            <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200/60 uppercase tracking-wide">S/ EAN</span>
                        )}
                        {product.sku ? (
                            <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200/60 uppercase tracking-wide flex items-center gap-1">
                                <Hash className="w-3 h-3" /> {product.sku}
                            </span>
                        ) : (
                            <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200/60 uppercase tracking-wide">S/ SKU</span>
                        )}
                    </div>

                    <span className="text-slate-900 font-black text-base leading-none">
                        R$ {Number(product.price).toFixed(2).replace('.', ',')}
                    </span>
                </div>
            </div>

            <div className="flex items-center md:flex-col md:items-end justify-between md:justify-center gap-4 w-full md:w-auto mt-2 md:mt-0">
                <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${stock > 0 || (product.variants?.reduce((acc, v) => acc + v.quantity, 0) || 0) > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'}`}>
                    {stock > 0 || (product.variants?.some(v => v.quantity > 0))
                        ? (product.variants && product.variants.length > 0
                            ? `${product.variants.reduce((acc, v) => acc + v.quantity, 0)} UNIDADES.`
                            : `${stock} UNIDADES.`)
                        : "S/ ESTOQUE"
                    }
                </div>

                <div className="flex gap-2">
                    <Link href={`/dashboard/products/${product.id}/edit`} className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-slate-50 hover:border-blue-200 transition-all shadow-sm">
                        <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={() => setIsConfirmOpen(true)}
                        className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-slate-50 hover:border-rose-200 transition-all shadow-sm"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                loading={isDeleting}
                title="Excluir Produto"
                description={`Tem certeza que deseja excluir "${product.title}"? Esta ação não pode ser desfeita.`}
                confirmText="Sim, Excluir"
                cancelText="Cancelar"
            />
        </div>
    )
}
