"use client"

import { AlertTriangle, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { ConfirmModalProps } from "@/src/types/ui/modals"

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

    const variantStyles = {
        danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-900/20",
        warning: "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-900/20",
        info: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/20"
    }

    const iconStyles = {
        danger: "text-rose-500 bg-rose-50",
        warning: "text-amber-500 bg-amber-50",
        info: "text-blue-500 bg-blue-50"
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent className="bg-white rounded-[32px] p-8 max-w-sm gap-0 border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)]">
                <AlertDialogHeader className="flex flex-col items-center text-center gap-4">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${iconStyles[variant]}`}>
                        <AlertTriangle className="w-10 h-10" />
                    </div>
                    <AlertDialogTitle className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col gap-3 sm:flex-col mt-10">
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault()
                            onConfirm()
                        }}
                        disabled={loading}
                        className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl active:scale-[0.98] transition-all disabled:opacity-50 ${variantStyles[variant]}`}
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : confirmText}
                    </AlertDialogAction>
                    <AlertDialogCancel
                        disabled={loading}
                        className="w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] bg-slate-50 border-none hover:bg-slate-100 text-slate-400 active:scale-[0.98] transition-all m-0 sm:m-0"
                    >
                        {cancelText}
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
