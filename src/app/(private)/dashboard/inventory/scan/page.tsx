"use client";

import {
    ArrowLeft,
    Package,
    Plus,
    Minus,
    Check,
    X,
    AlertCircle,
    Zap,
    ZapOff,
    Camera
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Html5Qrcode } from "html5-qrcode";
import { createStockMovement, getProductByIdentifier } from "@/src/services/stock";
import { Product } from "@/src/types/products/product";

export default function ScanPage() {
    const { data: session } = useSession();
    const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [adjustmentMode, setAdjustmentMode] = useState<"IN" | "OUT" | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");
    const [status, setStatus] = useState<{ type: "success" | "error", message: string } | null>(null);
    const [isScannerReady, setIsScannerReady] = useState(false);
    const [isFlashOn, setIsFlashOn] = useState(false);
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

    const getImageUrl = (url?: string) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        const baseUrl = (session?.user as any)?.callbackUrl || "";
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const startScanner = async () => {
        try {
            const html5QrCode = new Html5Qrcode("reader-full");
            html5QrCodeRef.current = html5QrCode;

            await html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 15,
                    qrbox: { width: 280, height: 160 },
                    aspectRatio: 1.0,
                },
                (decodedText) => {
                    handleScan(decodedText);
                },
                () => { }
            );
            setIsScannerReady(true);
        } catch (err) {
            console.warn("Scanner não iniciado (Câmera não encontrada).");
        }
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
            await html5QrCodeRef.current.stop();
        }
    };

    useEffect(() => {
        startScanner();
        return () => { stopScanner(); };
    }, []);

    const handleScan = async (code: string) => {
        if (loading || adjustmentMode) return;

        setLoading(true);
        setStatus(null);
        try {
            const result = await getProductByIdentifier(code);
            if (result.data) {
                setScannedProduct(result.data);
                if (window.navigator.vibrate) window.navigator.vibrate(100);
            } else {
                setStatus({ type: "error", message: "Produto não encontrado" });
            }
        } catch (error) {
            setStatus({ type: "error", message: "Erro ao buscar produto" });
        } finally {
            setLoading(false);
        }
    };

    const toggleFlash = async () => {
        if (html5QrCodeRef.current && isScannerReady) {
            const state = !isFlashOn;
            await html5QrCodeRef.current.applyVideoConstraints({ advanced: [{ torch: state } as any] });
            setIsFlashOn(state);
        }
    };

    const handleApplyAdjustment = async () => {
        if (!scannedProduct || !adjustmentMode) return;
        setLoading(true);
        try {
            const result = await createStockMovement({
                productId: scannedProduct.id,
                type: adjustmentMode,
                quantity: quantity,
                note: note || (adjustmentMode === "IN" ? "Entrada via Scanner" : "Saída via Scanner")
            });

            if (result.data) {
                setStatus({ type: "success", message: "Estoque atualizado!" });
                setScannedProduct(prev => prev ? { ...prev, quantity: (prev.quantity || 0) + (adjustmentMode === "IN" ? quantity : -quantity) } : null);
                setAdjustmentMode(null);
                setQuantity(1);
                setNote("");
            } else {
                setStatus({ type: "error", message: result.error || "Erro ao atualizar" });
            }
        } catch (error) {
            setStatus({ type: "error", message: "Erro de conexão" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black overflow-hidden relative">
            <div id="reader-full" className="absolute inset-0 z-0 h-full w-full"></div>
            <div className="absolute inset-0 z-1 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
            <div className="absolute inset-0 z-1 pointer-events-none bg-linear-to-b from-black/60 via-transparent to-black/80"></div>

            <div className="relative z-10 flex flex-col h-full p-4 pb-32">
                <header className="flex items-center justify-between py-2">
                    <Link href="/dashboard" className="w-12 h-12 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-all shadow-2xl">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="bg-emerald-500/20 backdrop-blur-2xl border border-emerald-500/30 px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-xl">
                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                        <span className="text-white text-[11px] font-black uppercase tracking-widest">Scanner Ativo</span>
                    </div>
                    <button onClick={toggleFlash} className={`w-12 h-12 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${isFlashOn ? 'bg-amber-400 text-slate-900 border-amber-300' : 'bg-white/10 text-white'}`}>
                        {isFlashOn ? <Zap className="w-6 h-6 fill-current" /> : <ZapOff className="w-6 h-6" />}
                    </button>
                </header>

                <div className="flex-1 flex items-center justify-center">
                    {!adjustmentMode && (
                        <div className="w-72 h-48 relative">
                            <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-emerald-500 rounded-tl-3xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                            <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-emerald-500 rounded-tr-3xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-emerald-500 rounded-bl-3xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-emerald-500 rounded-br-3xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)] animate-scan-slow"></div>
                        </div>
                    )}
                </div>

                <div className="fixed bottom-6 inset-x-4 space-y-3 z-50">
                    {status && (
                        <div className={`p-4 rounded-2xl flex items-center gap-3 bg-white shadow-2xl animate-in slide-in-from-bottom-2 ${status.type === 'success' ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {status.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            <span className="text-xs font-black uppercase tracking-tight">{status.message}</span>
                        </div>
                    )}

                    {scannedProduct && !adjustmentMode && (
                        <div className="bg-white p-5 rounded-[32px] flex items-center gap-5 shadow-2xl animate-in slide-in-from-bottom-10 border-4 border-emerald-500/20 backdrop-blur-xl">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 overflow-hidden">
                                {scannedProduct.images && scannedProduct.images.length > 0 ? (
                                    <img 
                                        src={getImageUrl(scannedProduct.images[0].url) || ""} 
                                        alt={scannedProduct.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Package className="w-8 h-8 text-slate-300" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-[9px] font-black uppercase text-blue-500 tracking-widest">{scannedProduct.sku || "PRODUTO IDENTIFICADO"}</span>
                                <h3 className="font-black text-slate-900 text-base leading-tight truncate">{scannedProduct.title}</h3>
                                <p className="text-xl font-black text-slate-900 leading-none mt-1">{scannedProduct.quantity || 0} <span className="text-[10px] text-slate-400 uppercase tracking-tighter">UN</span></p>
                            </div>
                            <button
                                onClick={() => setAdjustmentMode("IN")}
                                className="bg-slate-900 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all"
                            >
                                Ajustar
                            </button>
                        </div>
                    )}

                    {adjustmentMode && (
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

            <style jsx>{`
                @keyframes scan-slow {
                    0% { transform: translateY(-80px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(80px); opacity: 0; }
                }
                .animate-scan-slow {
                    animation: scan-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
