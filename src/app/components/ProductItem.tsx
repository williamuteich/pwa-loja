"use client"

import { Edit3, Trash2, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Product } from "@/src/types/products/product"
import { deleteProduct } from "@/src/services/product"
import { ConfirmModal } from "./ConfirmModal"

interface ProductItemProps {
    product: Product
    backendUrl: string
}

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
        <div className="bg-white border-2 border-slate-100 p-4 rounded-xl flex items-center justify-between active:border-blue-200 transition-colors shadow-sm">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-black text-slate-300 overflow-hidden">
                    {imageUrl ? (
                        <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">
                        {product.sku || "SEM CÓDIGO"}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight max-w-[140px] truncate">{product.title}</h3>
                    <span className="text-slate-900 font-black text-lg mt-1">
                        R$ {Number(product.price).toFixed(2).replace('.', ',')}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${stock > 0 || (product.variants?.reduce((acc, v) => acc + v.quantity, 0) || 0) > 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                        {stock > 0 || (product.variants?.some(v => v.quantity > 0))
                            ? (product.variants && product.variants.length > 0
                                ? `${product.variants.reduce((acc, v) => acc + v.quantity, 0)} un`
                                : `${stock} un`)
                            : "SEM ESTOQUE"
                        }
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href={`/dashboard/products/${product.id}/edit`} className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                        <Edit3 className="w-4 h-4" />
                    </Link>
                    <button 
                        onClick={() => setIsConfirmOpen(true)}
                        className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors"
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
