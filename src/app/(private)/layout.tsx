"use client";

import { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
            <main className="mx-auto w-full min-h-screen bg-white shadow-sm relative">
                {children}
            </main>
        </div>
    );
}
