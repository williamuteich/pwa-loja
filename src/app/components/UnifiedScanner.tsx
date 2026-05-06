"use client"

import { X, ArrowLeft, QrCode, Zap, ZapOff, RefreshCcw } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { ManualInputModal } from "./ManualInputModal"

interface UnifiedScannerProps {
    onScan: (text: string) => void
    onClose: () => void
    title?: string
    isPage?: boolean
}

export function UnifiedScanner({ onScan, onClose, title = "Escanear Produto", isPage = false }: UnifiedScannerProps) {
    const [isScannerReady, setIsScannerReady] = useState(false)
    const [isFlashOn, setIsFlashOn] = useState(false)
    const [isManualInputOpen, setIsManualInputOpen] = useState(false)
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null)

    useEffect(() => {
        startScanner()
        return () => {
            stopScanner()
        }
    }, [])

    const startScanner = async () => {
        try {
            const containerId = "unified-reader"
            if (!html5QrCodeRef.current) {
                html5QrCodeRef.current = new Html5Qrcode(containerId)
            }

            await html5QrCodeRef.current.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 280, height: 180 } },
                (text) => {
                    onScan(text)
                    if (!isPage) stopScanner()
                },
                () => { }
            )
            setIsScannerReady(true)
        } catch (err) {
            console.warn("Câmera primária falhou, tentando secundária...")
            try {
                if (html5QrCodeRef.current) {
                    await html5QrCodeRef.current.start({ facingMode: "user" }, { fps: 10, qrbox: 250 }, (text) => {
                        onScan(text)
                        if (!isPage) stopScanner()
                    }, () => { })
                    setIsScannerReady(true)
                }
            } catch (finalErr) { }
        }
    }

    const stopScanner = async () => {
        try {
            if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
                await html5QrCodeRef.current.stop()
            }
            setIsScannerReady(false)
            setIsFlashOn(false)
        } catch (err) { }
    }

    const toggleFlash = async () => {
        try {
            if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
                const newState = !isFlashOn
                await html5QrCodeRef.current.applyVideoConstraints({
                    advanced: [{ torch: newState } as any]
                })
                setIsFlashOn(newState)
            }
        } catch (err) { }
    }

    return (
        <div className={`fixed inset-0 z-9999 flex flex-col bg-black animate-in fade-in duration-200`}>
            <div id="unified-reader" className="absolute inset-0 z-0 h-full w-full"></div>

            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="w-72 h-44 relative">
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-emerald-500 rounded-tl-3xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-emerald-500 rounded-tr-3xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-emerald-500 rounded-bl-3xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-emerald-500 rounded-br-3xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)] animate-scan-slow"></div>
                </div>
            </div>

            <div className="absolute top-0 inset-x-0 z-30 p-6 flex items-center justify-between bg-linear-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <QrCode className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-white text-sm font-black uppercase tracking-widest leading-none mb-1">{title}</h2>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-emerald-400/80 text-[8px] font-bold uppercase tracking-widest">Scanner Ativo</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleFlash}
                        className={`w-10 h-10 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${isFlashOn ? 'bg-amber-400 text-slate-900 border-amber-300' : 'bg-white/10 text-white'}`}
                    >
                        {isFlashOn ? <Zap className="w-5 h-5 fill-current" /> : <ZapOff className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all active:scale-90"
                    >
                        {isPage ? <ArrowLeft className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {!isScannerReady && (
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black gap-6 p-10 text-center text-white">
                    <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center border border-slate-800 shadow-2xl">
                        <RefreshCcw className="w-8 h-8 text-emerald-500 animate-spin" />
                    </div>
                    <div>
                        <span className="text-white text-xs font-black uppercase tracking-widest block mb-2">Acessando Câmera...</span>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                            Se a câmera não abrir em instantes,<br />use a entrada manual abaixo.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsManualInputOpen(true)}
                        className="mt-4 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-900/20 active:scale-95 transition-all"
                    >
                        Digitar Manualmente
                    </button>
                </div>
            )}

            <ManualInputModal
                isOpen={isManualInputOpen}
                onClose={() => setIsManualInputOpen(false)}
                onConfirm={(ean, sku) => {
                    onScan(ean || sku)
                    setIsManualInputOpen(false)
                    if (!isPage) onClose()
                }}
                title="Entrada Manual"
                description="Busque o produto por EAN ou SKU"
            />

            <style jsx>{`
                @keyframes scan-slow {
                    0% { transform: translateY(-90px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(90px); opacity: 0; }
                }
                .animate-scan-slow {
                    animation: scan-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}
