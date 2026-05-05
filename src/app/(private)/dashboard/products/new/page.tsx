import {
    ArrowLeft,
    Save,
    Camera,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    return (
        <div className="flex flex-col gap-6 animate-in-view pb-32">
            <header className="flex items-center gap-4 py-2 px-1">
                <Link href="/dashboard" className="w-10 h-10 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Novo Produto</h1>
            </header>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Mídia do Produto</label>
                    <div className="flex items-center gap-4 p-5 bg-white border-2 border-slate-100 rounded-2xl shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                            <Camera className="w-7 h-7" />
                            <span className="text-[8px] font-black uppercase mt-1">Carregar</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-sm">Imagem Principal</h4>
                            <p className="text-[11px] text-slate-400 leading-tight mt-1">Recomendado: Quadrada, fundo branco ou neutro.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Informações Básicas</label>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Nome comercial do produto"
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-sm font-medium outline-none focus:border-blue-500 transition-all shadow-sm"
                            />
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="SKU ou EAN-13"
                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-sm font-medium outline-none focus:border-blue-500 transition-all shadow-sm"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">OBRIGATÓRIO</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Preço e Estoque</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">R$</span>
                                <input
                                    type="number"
                                    placeholder="0,00"
                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 pl-10 text-sm font-black text-slate-900 outline-none focus:border-blue-500 transition-all shadow-sm"
                                />
                            </div>
                            <input
                                type="number"
                                placeholder="Qtd. Inicial"
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-sm font-black text-slate-900 outline-none focus:border-blue-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm">Autosync Ativo</span>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                            Este item será publicado imediatamente no catálogo da loja após a confirmação.
                        </p>
                    </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-100 active:scale-95 transition-all">
                    <Save className="w-6 h-6" strokeWidth={3} />
                    Confirmar Cadastro
                </button>
            </div>
        </div>
    );
}
