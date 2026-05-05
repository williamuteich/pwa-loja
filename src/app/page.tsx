"use client";

import { signIn } from "next-auth/react";
import { Package, Smartphone, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
            <Package className="text-white w-8 h-8" strokeWidth={2.5} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">StoreFlow</h1>
            <p className="text-slate-500 text-sm font-medium">Gestão de Inventário e Produtos</p>
          </div>
        </div>

        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <Smartphone className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Interface Otimizada Mobile</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Sincronização Segura</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full h-14 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center gap-3 text-slate-700 font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            <img src="https://authjs.dev/img/providers/google.svg" className="w-5 h-5" alt="Google" />
            Entrar com Google
          </button>
          <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-[0.2em]">Acesso restrito a colaboradores</p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 opacity-40">
        <div className="h-px w-8 bg-slate-300"></div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">TW Serviços Digitais</span>
        <div className="h-px w-8 bg-slate-300"></div>
      </div>
    </div>
  );
}