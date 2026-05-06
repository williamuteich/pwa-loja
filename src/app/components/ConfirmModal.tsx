"use client"

import { AlertTriangle, X, Loader2 } from "lucide-react"
import { useEffect } from "react"

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    loading?: boolean
    variant?: "danger" | "warning" | "info"
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    loading = false,
    variant = "danger"
}: ConfirmModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    if (!isOpen) return null

    const variantStyles = {
        danger: {
            icon: "bg-rose-50 text-rose-500 border-rose-100",
            button: "bg-rose-500 text-white shadow-rose-900/20 hover:bg-rose-600"
        },
        warning: {
            icon: "bg-amber-50 text-amber-500 border-amber-100",
            button: "bg-amber-500 text-white shadow-amber-900/20 hover:bg-amber-600"
        },
        info: {
            icon: "bg-blue-50 text-blue-500 border-blue-100",
            button: "bg-blue-600 text-white shadow-blue-900/20 hover:bg-blue-700"
        }
    }

    const style = variantStyles[variant]

    return (
        <div className="fixed inset-0 z-10000 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
            <div
                className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-300 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-10">
                    <div className={`w-24 h-24 ${style.icon} rounded-[32px] mx-auto flex items-center justify-center border-4 mb-8 shadow-sm`}>
                        <AlertTriangle className="w-12 h-12" />
                    </div>

                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-3">{title}</h3>
                        <p className="text-sm font-bold text-slate-400 leading-relaxed px-2 uppercase tracking-wide">{description}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className={`w-full ${style.button} py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2`}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : confirmText}
                        </button>
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="w-full bg-slate-50 text-slate-400 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] active:scale-[0.98] transition-all"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
