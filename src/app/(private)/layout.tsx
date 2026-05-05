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
            <main className="mx-auto w-full min-h-screen bg-white shadow-sm relative pb-32">
                <div className="px-4">
                    {children}
                </div>

                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-20 bg-white/95 backdrop-blur-xl border-t-2 border-slate-100 px-12 flex items-center justify-between z-50">
                    <Link href="/dashboard" className={`flex flex-col items-center gap-1 transition-all ${isActive("/dashboard") ? "text-blue-600 scale-110" : "text-slate-400"}`}>
                        <div className={`p-2 rounded-xl border ${isActive("/dashboard") ? "bg-blue-50 border-blue-100" : "bg-transparent border-transparent"}`}>
                            <LayoutGrid className="w-6 h-6" />
                        </div>
                    </Link>

                    <Link href="/dashboard/products" className={`flex flex-col items-center gap-1 transition-all ${isActive("/dashboard/products") ? "text-blue-600 scale-110" : "text-slate-400"}`}>
                        <div className={`p-2 rounded-xl border ${isActive("/dashboard/products") ? "bg-blue-50 border-blue-100" : "bg-transparent border-transparent"}`}>
                            <Package className="w-6 h-6" />
                        </div>
                    </Link>

                    <Link href="/dashboard/inventory/scan" className={`flex flex-col items-center gap-1 transition-all ${isActive("/dashboard/inventory/scan") ? "text-blue-600 scale-110" : "text-slate-400"}`}>
                        <div className={`p-2 rounded-xl border ${isActive("/dashboard/inventory/scan") ? "bg-blue-50 border-blue-100" : "bg-transparent border-transparent"}`}>
                            <Barcode className="w-6 h-6" />
                        </div>
                    </Link>
                </nav>
            </main>
        </div>
    );
}
