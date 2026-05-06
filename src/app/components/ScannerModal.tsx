"use client"

import React, { useEffect, useRef, useState } from "react";
import { X, Camera, Zap, ZapOff, RefreshCcw } from "lucide-react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

interface ScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onScan: (code: string) => void;
    title?: string;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
    isOpen,
    onClose,
    onScan,
    title = "Escanear Código"
}) => {
    const [isScannerReady, setIsScannerReady] = useState(false);
    const [isFlashOn, setIsFlashOn] = useState(false);
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const cameraIdRef = useRef<string | null>(null);

    const startScanner = async () => {
        try {
            const html5QrCode = new Html5Qrcode("reader-camera");
            html5QrCodeRef.current = html5QrCode;

            let devices: any[] = [];
            try {
                devices = await Html5Qrcode.getCameras();
            } catch (e) {
                console.warn("Não foi possível listar câmeras, tentando modo direto...");
            }

            const config = {
                fps: 15,
                qrbox: { width: 280, height: 160 },
                aspectRatio: 1.0,
            };

            const onScanSuccess = (decodedText: string) => {
                if (window.navigator.vibrate) window.navigator.vibrate(100);
                onScan(decodedText);
                stopScanner();
            };

            if (devices && devices.length > 0) {
                const backCamera = devices.find(device =>
                    device.label.toLowerCase().includes('back') ||
                    device.label.toLowerCase().includes('traseira') ||
                    device.label.toLowerCase().includes('environment')
                );

                const selectedCameraId = backCamera ? backCamera.id : devices[0].id;
                cameraIdRef.current = selectedCameraId;

                await html5QrCode.start(selectedCameraId, config, onScanSuccess, () => { });
            } else {
                await html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess, () => { });
            }

            setIsScannerReady(true);
        } catch (err) {
            console.error("Erro ao iniciar scanner:", err);
            try {
                if (html5QrCodeRef.current) {
                    await html5QrCodeRef.current.start({ facingMode: "user" }, { fps: 10, qrbox: 250 }, (text) => {
                        onScan(text);
                        stopScanner();
                    }, () => { });
                    setIsScannerReady(true);
                }
            } catch (finalErr) {
                console.error("Falha total ao acessar câmera:", finalErr);
            }
        }
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
            try {
                await html5QrCodeRef.current.stop();
                html5QrCodeRef.current.clear();
            } catch (err) {
                console.error("Erro ao parar scanner:", err);
            }
        }
        setIsScannerReady(false);
    };

    const toggleFlash = async () => {
        if (html5QrCodeRef.current && isScannerReady) {
            try {
                const state = !isFlashOn;
                await html5QrCodeRef.current.applyVideoConstraints({
                    advanced: [{ torch: state } as any]
                });
                setIsFlashOn(state);
            } catch (err) {
                console.error("Erro ao alternar flash:", err);
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            startScanner();
        } else {
            stopScanner();
        }
        return () => { stopScanner(); };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-black animate-in fade-in duration-200">
            <div className="absolute top-0 inset-x-0 z-20 p-6 flex items-center justify-between bg-linear-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Camera className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-white font-black text-sm uppercase tracking-tight">{title}</h2>
                        <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">Câmera Ativa</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-all"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                <div id="reader-camera" className="w-full h-full object-cover"></div>

                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-72 h-44 relative">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-2xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-2xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-2xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-2xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)] animate-scan-slow"></div>
                    </div>
                </div>

                {!isScannerReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black gap-6 p-10 text-center">
                        <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center border border-slate-800">
                            <RefreshCcw className="w-8 h-8 text-emerald-500 animate-spin" />
                        </div>
                        <div>
                            <span className="text-white text-xs font-black uppercase tracking-widest block mb-2">Acessando Câmera...</span>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                Se a câmera não abrir em instantes,<br/>use a entrada manual abaixo.
                            </p>
                        </div>
                        <button 
                            onClick={() => {
                                const code = prompt("Digite o código:");
                                if (code) {
                                    onScan(code);
                                    onClose();
                                }
                            }}
                            className="mt-4 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-900/20 active:scale-95 transition-all"
                        >
                            Digitar Manualmente
                        </button>
                    </div>
                )}
            </div>

            <div className="absolute bottom-12 inset-x-0 z-20 flex justify-center gap-6 px-10">
                <button
                    onClick={toggleFlash}
                    className={`w-16 h-16 rounded-3xl backdrop-blur-xl border-2 flex items-center justify-center transition-all active:scale-90 ${isFlashOn ? 'bg-emerald-500 border-emerald-400 text-white shadow-xl shadow-emerald-900/40' : 'bg-white/10 border-white/20 text-white'}`}
                >
                    {isFlashOn ? <Zap className="w-7 h-7" /> : <ZapOff className="w-7 h-7" />}
                </button>
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
};
