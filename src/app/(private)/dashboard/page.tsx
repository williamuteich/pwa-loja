import { getServerSession } from "next-auth";
import { auth } from "@/src/lib/auth-config";
import {
    Plus,
    Search,
    Barcode,
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
        <div className="flex flex-col gap-8 pb-24 animate-in fade-in duration-500">            <div className="bg-slate-900 px-6 py-12 relative overflow-hidden flex flex-col items-center text-center shadow-lg">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center bg-white shadow-xl mb-5">
                        <img src="/logo-icon.png" alt="Logo Icon" className="w-full h-full object-cover p-2" />
                    </div>
                    
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">PWA Inventory</span>
                    
                    <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-1">
                        Olá, <span className="text-blue-500">{firstName}</span>
                    </h1>
                    
                    <p className="text-xs font-bold text-slate-400 mt-2 max-w-[200px]">
                        O que você deseja gerenciar hoje?
                    </p>
                </div>

                <div className="absolute top-6 right-6 z-20">
                    {session?.user?.image ? (
                        <img src={session.user.image} alt="Profile" className="w-10 h-10 object-cover rounded-full border-2 border-slate-700 shadow-md" />
                    ) : (
                        <div className="w-10 h-10 bg-slate-800 border-2 border-slate-700 flex items-center justify-center rounded-full shadow-md">
                            <User className="text-slate-400 w-5 h-5" />
                        </div>
                    )}
                </div>
            </div>


            <div className="grid grid-cols-2 gap-4 px-6 -mt-4 relative z-20">
                <Link href="/dashboard/products/new" className="bg-white border-2 border-slate-100 p-6 rounded-xl flex flex-col gap-4 active:border-blue-600 transition-all shadow-md">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100">
                        <Plus className="text-white w-6 h-6" strokeWidth={3} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm leading-tight">Novo Produto</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Cadastrar novo Produto</span>
                    </div>
                </Link>

                <Link href="/dashboard/inventory/scan" className="bg-white border-2 border-slate-100 p-6 rounded-xl flex flex-col gap-4 active:border-slate-900 transition-all shadow-md">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                        <Barcode className="text-white w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm leading-tight">Scanner / Baixa</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Consulta de Produto</span>
                    </div>
                </Link>

                <Link href="/dashboard/inventory/link" className="bg-white border-2 border-slate-100 p-6 rounded-xl flex flex-col gap-4 active:border-emerald-600 transition-all shadow-md">
                    <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-100">
                        <QrCode className="text-white w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm leading-tight">Vincular Código</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Registrar EAN / SKU</span>
                    </div>
                </Link>

                <Link href="/dashboard/products" className="bg-white border-2 border-slate-100 p-6 rounded-xl flex flex-col gap-4 active:border-slate-900 transition-all shadow-md">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 border border-slate-200">
                        <Search className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm leading-tight">Catálogo</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase mt-1">Gerenciar Produtos</span>
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

            <div className="grid grid-cols-2 gap-4 px-6 -mt-4">
                <div className="h-36 bg-slate-100 rounded-xl"></div>
                <div className="h-36 bg-slate-100 rounded-xl"></div>
                <div className="h-36 bg-slate-100 rounded-xl"></div>
                <div className="h-36 bg-slate-100 rounded-xl"></div>
            </div>
        </div>
    );
}
