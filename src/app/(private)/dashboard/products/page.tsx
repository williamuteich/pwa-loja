import {
    Search,
    ArrowLeft,
    Plus,
    Edit3,
    Trash2,
    Filter
} from "lucide-react";
import Link from "next/link";

const mockProducts = [
    { id: 1, name: "Camiseta Oversized Black", price: "R$ 89,90", stock: 45, sku: "TS-001" },
    { id: 2, name: "Calça Cargo Khaki", price: "R$ 159,90", stock: 12, sku: "PT-042" },
    { id: 3, name: "Tênis Urban Sport", price: "R$ 299,90", stock: 0, sku: "SH-099" },
];

export default function ProductsPage() {
    return (
        <div className="flex flex-col gap-6 animate-in-view pb-32">
            <header className="flex items-center justify-between py-2 px-1">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="w-10 h-10 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition-transform">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Catálogo</h1>
                </div>
                <Link href="/dashboard/products/new" className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 active:scale-95 transition-transform">
                    <Plus className="w-6 h-6 text-white" strokeWidth={3} />
                </Link>
            </header>

            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Pesquisar por nome ou SKU..."
                    className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 pl-12 pr-4 text-sm font-medium focus:border-blue-500 outline-none transition-all shadow-sm"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-300">
                    <Filter className="w-4 h-4" />
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {mockProducts.map((product) => (
                    <div key={product.id} className="bg-white border-2 border-slate-100 p-4 rounded-2xl flex items-center justify-between active:border-blue-200 transition-colors shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-black text-slate-300 text-sm">
                                IMG
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{product.sku}</span>
                                <h3 className="font-bold text-slate-900 text-sm leading-tight">{product.name}</h3>
                                <span className="text-slate-900 font-black text-lg mt-1">{product.price}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                {product.stock} NO ESTOQUE
                            </div>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
