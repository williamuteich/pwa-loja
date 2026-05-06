"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Package, Barcode } from "lucide-react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/dashboard" && pathname === "/dashboard") return true;
        if (path !== "/dashboard" && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
            <main className="mx-auto w-full h-screen bg-white shadow-sm relative pb-32">
                <div className="">
                    {children}
                </div>

                {!pathname.includes('/inventory/scan') && (
                    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 px-6">
                        <nav className="w-full max-w-[440px] h-20 bg-slate-900 border-t-2 border-blue-600/30 rounded-2xl px-10 flex items-center justify-between shadow-2xl">

                            <Link href="/dashboard" className="flex flex-col items-center gap-1 transition-all active:scale-95">
                                <div className={`p-2 rounded-lg transition-all duration-300 ${isActive("/dashboard") ? "text-blue-400" : "text-slate-500"}`}>
                                    <LayoutGrid className="w-6 h-6" strokeWidth={isActive("/dashboard") ? 2.5 : 2} />
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all ${isActive("/dashboard") ? "text-blue-400" : "text-slate-500"}`}>Painel</span>
                            </Link>

                            <Link href="/dashboard/products" className="flex flex-col items-center gap-1 transition-all active:scale-95">
                                <div className={`p-2 rounded-lg transition-all duration-300 ${isActive("/dashboard/products") ? "text-blue-400" : "text-slate-500"}`}>
                                    <Package className="w-6 h-6" strokeWidth={isActive("/dashboard/products") ? 2.5 : 2} />
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all ${isActive("/dashboard/products") ? "text-blue-400" : "text-slate-500"}`}>Produtos</span>
                            </Link>

                            <Link href="/dashboard/inventory/scan" className="flex flex-col items-center gap-1 transition-all active:scale-95">
                                <div className={`p-2 rounded-lg transition-all duration-300 ${isActive("/dashboard/inventory/scan") ? "text-blue-400" : "text-slate-500"}`}>
                                    <Barcode className="w-6 h-6" strokeWidth={isActive("/dashboard/inventory/scan") ? 2.5 : 2} />
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all ${isActive("/dashboard/inventory/scan") ? "text-blue-400" : "text-slate-500"}`}>Scanner</span>
                            </Link>

                        </nav>
                    </div>
                )}
            </main>
        </div>
    );
}
