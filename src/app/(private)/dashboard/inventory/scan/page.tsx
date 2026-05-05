"use client";

import {
    ArrowLeft,
    Flashlight,
    Package,
    RefreshCw
} from "lucide-react";
import Link from "next/link";

export default function ScanPage() {
    return (
        <div className="flex flex-col gap-6 animate-in-view h-[calc(100vh-4rem)]">
            <header className="flex items-center gap-4 py-2 px-1">
                <Link href="/dashboard" className="w-10 h-10 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Scanner</h1>
            </header>

            <div className="relative flex-1 rounded-4xl overflow-hidden bg-slate-900 border-4 border-slate-100 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-72 h-56 relative">
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl"></div>
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-500 rounded-br-2xl"></div>

                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] animate-scan"></div>
                    </div>
                </div>

                <div className="absolute top-8 w-full text-center px-10">
                    <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 py-2 rounded-full">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest">Aguardando Código...</p>
                    </div>
                </div>

                <div className="absolute bottom-8 w-full flex justify-center gap-6">
                    <button className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-white active:bg-blue-600 transition-colors">
                        <Flashlight className="w-7 h-7" />
                    </button>
                    <button className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-white active:bg-blue-600 transition-colors">
                        <RefreshCw className="w-7 h-7" />
                    </button>
                </div>
            </div>

            <div className="bg-white border-2 border-blue-100 p-5 rounded-4xl flex items-center gap-5 shadow-lg shadow-blue-50">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                    <Package className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                    <span className="text-[9px] font-black uppercase text-blue-500 tracking-wider">Identificado</span>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">Camiseta Oversized Black</h3>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-lg font-black text-slate-900 leading-none">45 UN</span>
                    <button className="text-[10px] font-black uppercase text-blue-600 mt-1">Ajustar</button>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100px); opacity: 0; }
                }
                .animate-scan {
                    animation: scan 2.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
