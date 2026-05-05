"use client";

import { signIn } from "next-auth/react";
import { Smartphone, ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginForm() {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-full max-w-sm">
                <div className="bg-white border-2 border-slate-200 rounded-xl p-8 shadow-xl flex flex-col items-center text-center">
                    <div className="w-full mb-8 flex justify-center">
                        <img src="/logo.png" alt="StoreFlow" className="w-40 h-auto object-contain" />
                    </div>

                    <div className="space-y-1 mb-8">
                        <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Autenticação de Operador</h1>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Painel de Gestão TW</p>
                    </div>

                    <div className="w-full space-y-2 mb-8">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                            <Smartphone className="w-4 h-4 text-slate-400" />
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Interface Mobile 1.0</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                            <ShieldCheck className="w-4 h-4 text-slate-400" />
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Conexão Segura</span>
                        </div>
                    </div>

                    <button
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="w-full h-14 bg-slate-900 rounded-lg flex items-center justify-between px-5 group active:scale-[0.99] transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-1.5 rounded-md">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                            </div>
                            <span className="text-white text-xs font-black uppercase tracking-widest">Entrar com Google</span>
                        </div>
                        <ArrowRight className="text-white/20 w-4 h-4" />
                    </button>
                </div>

                <div className="mt-8 flex flex-col items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">TW Digital Ecosystem</span>
                </div>
            </div>
        </div>
    );
}
