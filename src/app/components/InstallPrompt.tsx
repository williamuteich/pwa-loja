"use client"

import { useState, useEffect } from "react"
import { Share, Download, CheckCircle2 } from "lucide-react"

export function InstallGuard({ children }: { children: React.ReactNode }) {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [isMounted, setIsMounted] = useState(false)
    const [justInstalled, setJustInstalled] = useState(false)

    useEffect(() => {
        const checkStandalone = () => {
            return window.matchMedia("(display-mode: standalone)").matches ||
                window.matchMedia("(display-mode: minimal-ui)").matches ||
                window.matchMedia("(display-mode: window-controls-overlay)").matches ||
                (window.navigator as any).standalone === true ||
                document.referrer.includes('android-app://');
        }

        setIsStandalone(checkStandalone())
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream)
        setIsMounted(true)

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e)
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

        window.addEventListener("appinstalled", () => {
            setJustInstalled(true)
        })

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        if (outcome === 'accepted') {
            setDeferredPrompt(null)
            setJustInstalled(true)
        }
    }

    if (!isMounted) {
        return (
            <div className="w-full h-16 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
            </div>
        )
    }

    if (isStandalone || justInstalled) {
        return <>{children}</>
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full animate-fluid-up">
            <div className="text-center mb-2">
                <p className="text-slate-600 text-sm font-semibold">Instalação Obrigatória</p>
                <p className="text-slate-500 text-xs mt-1">Para acessar o sistema, instale o aplicativo no seu dispositivo.</p>
            </div>

            {isIOS ? (
                <div className="w-full bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
                    <div className="flex items-center gap-2 justify-center mb-1">
                        <Share className="w-5 h-5 text-blue-500 shrink-0" />
                        <p className="text-sm font-bold text-blue-800">Instalar no iPhone / iPad</p>
                    </div>
                    <p className="text-xs text-blue-700 leading-relaxed text-center">
                        Toque no botão <strong>Compartilhar</strong> <span aria-label="ícone compartilhar" className="text-lg">⎋</span> no menu inferior do Safari e depois selecione <strong>"Adicionar à Tela Inicial"</strong> <span aria-label="ícone adicionar" className="text-lg">➕</span>.
                    </p>
                </div>
            ) : deferredPrompt ? (
                <button
                    onClick={handleInstallClick}
                    className="group relative w-full flex items-center justify-center gap-3 bg-emerald-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 hover:bg-emerald-600 active:scale-[0.98] border border-emerald-400 shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.3)] overflow-hidden"
                >
                    <Download className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                    <span className="uppercase tracking-tight text-base">Instalar Aplicativo</span>
                </button>
            ) : (
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Acesse este site pelo navegador nativo (Chrome no Android ou Safari no iOS) para instalar o aplicativo e liberar o acesso.
                    </p>
                </div>
            )}
        </div>
    )
}
