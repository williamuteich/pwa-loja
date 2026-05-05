import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import {
    Plus,
    Search,
    Barcode,
    LogOut,
    User,
    QrCode
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ButtonLogout } from "../../components/buttonGoogle";

export default function DashboardPage() {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <DashboardContent />
        </Suspense>
    );
}

async function DashboardContent() {
    const session = await getServerSession(auth);
    const firstName = session?.user?.name?.split(' ')[0] || "Usuário";

    return (
        <div className="flex flex-col gap-8 pb-24 animate-in fade-in duration-500">
            <div className="bg-slate-900 -mx-4 px-6 py-12 border-b-4 border-blue-600 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-lg">
                                <img src="/logo-icon.png" alt="Logo Icon" className="w-full h-full object-cover scale-110" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Operação de Loja</span>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight leading-none">
                            Olá, <span className="text-blue-600 font-black">{firstName}</span>
                        </h1>

                        <div className="flex items-center gap-5 mt-6">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Estoque Total</span>
                                <span className="text-2xl font-black text-white leading-none">2.428</span>
                            </div>
                            <div className="h-8 w-px bg-slate-800"></div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Sincronização</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-black text-white uppercase tracking-tighter">Agora</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-26 h-26 rounded-xl bg-slate-800 border border-slate-700 p-1 shadow-inner overflow-hidden">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt="Profile" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <div className="w-full h-full bg-slate-700 flex items-center justify-center rounded-lg">
                                <User className="text-slate-500 w-8 h-8" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 px-2 -mt-4 relative z-20">
                <Link href="/dashboard/products/new" className="bg-white border-2 border-slate-100 p-6 rounded-xl flex flex-col gap-4 active:border-blue-600 transition-all shadow-md">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100">
                        <Plus className="text-white w-6 h-6" strokeWidth={3} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm leading-tight">Novo Produto</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Cadastrar Item</span>
                    </div>
                </Link>

                <Link href="/dashboard/inventory/scan" className="bg-white border-2 border-slate-100 p-6 rounded-xl flex flex-col gap-4 active:border-slate-900 transition-all shadow-md">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                        <Barcode className="text-white w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm leading-tight">Scanner / Baixa</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Consultar e Sair</span>
                    </div>
                </Link>

                <Link href="/dashboard/inventory/link" className="bg-white border-2 border-slate-100 p-6 rounded-xl flex flex-col gap-4 active:border-blue-600 transition-all shadow-md">
                    <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-100">
                        <QrCode className="text-white w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm leading-tight">Vincular QR</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Novo Código</span>
                    </div>
                </Link>

                <Link href="/dashboard/products" className="bg-white border-2 border-slate-100 p-6 rounded-xl flex flex-col gap-4 active:border-slate-900 transition-all shadow-md">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 border border-slate-200">
                        <Search className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm leading-tight">Catálogo</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Editar Itens</span>
                    </div>
                </Link>
            </div>

            <div className="mt-6 px-2 flex justify-center">
                <ButtonLogout />
            </div>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-8 pb-24 animate-pulse">
            <div className="bg-slate-900 -mx-4 px-6 py-12 border-b-4 border-slate-800 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-800"></div>
                            <div className="h-3 w-24 bg-slate-800 rounded-full"></div>
                        </div>
                        <div className="h-8 w-48 bg-slate-800 rounded-lg"></div>
                        <div className="flex gap-4 mt-2">
                            <div className="h-10 w-20 bg-slate-800 rounded-lg"></div>
                            <div className="h-10 w-20 bg-slate-800 rounded-lg"></div>
                        </div>
                    </div>
                    <div className="w-26 h-26 rounded-xl bg-slate-800"></div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 px-2 -mt-4">
                <div className="h-36 bg-slate-100 rounded-xl"></div>
                <div className="h-36 bg-slate-100 rounded-xl"></div>
                <div className="h-36 bg-slate-100 rounded-xl"></div>
                <div className="h-36 bg-slate-100 rounded-xl"></div>
            </div>
        </div>
    );
}
