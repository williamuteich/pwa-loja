"use client";

import { Search, Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ProductSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("search")?.toString() || "");

    useEffect(() => {
        const currentSearch = searchParams.get("search") || "";
        if (searchTerm === currentSearch) return;

        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (searchTerm) {
                params.set("search", searchTerm);
            } else {
                params.delete("search");
            }
            params.set("page", "1");

            replace(`${pathname}?${params.toString()}`);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, pathname, replace]);

    return (
        <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <input
                type="text"
                placeholder="Pesquisar por nome ou Descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 pl-12 pr-12 text-sm font-medium focus:border-blue-500 outline-none transition-all shadow-sm"
            />
            {searchTerm && (
                <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-12 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-slate-500 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-blue-500 transition-colors">
                <Filter className="w-4 h-4" />
            </button>
        </div>
    );
}
