"use client"

import { ArrowLeft, Barcode, Check, Search, QrCode, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { Product } from "@/src/types/products/product";
import { ScannerModal } from "@/src/app/components/ScannerModal";
import { getProductsMissingInfo, updateStockProduct } from "@/src/services/stock";


export default function InventoryLinkPage() {
    const { data: session } = useSession();
    const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const [isManualInputOpen, setIsManualInputOpen] = useState(false);
    const [manualCode, setManualCode] = useState("");
    const [updating, setUpdating] = useState(false);

    const getImageUrl = (url?: string) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        const baseUrl = (session?.user as any)?.callbackUrl || "";
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    const fetchPending = async () => {
        setLoading(true);
        try {
            const result = await getProductsMissingInfo();
            const products = result.data || result;
            if (Array.isArray(products)) {
                setPendingProducts(products);
            }
        } catch (error) {
            console.error("Erro ao buscar pendências:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const handleScan = (code: string) => {
        setScannedCode(code);
        setIsScannerOpen(false);
    };

    const confirmLink = async (type: "barcode" | "sku") => {
        if (!selectedProduct || !scannedCode) return;

        setUpdating(true);
        const updateData: any = {};

        if (type === "barcode") {
            updateData.barcode = scannedCode;
        } else {
            updateData.sku = scannedCode;
        }

        const result = await updateStockProduct(selectedProduct.id, updateData);

        if (result.error) {
            alert(result.error);
        } else {
            setScannedCode(null);
            setSelectedProduct(null);
            fetchPending();
        }
        setUpdating(false);
    };

    const filteredProducts = pendingProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
            <header className="bg-slate-900 px-6 py-8 border-b-4 border-emerald-600 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl"></div>
                <div className="flex items-center gap-4 relative z-10">
                    <Link href="/dashboard" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1">Identificadores</p>
                        <h1 className="text-2xl font-black text-white tracking-tight">Vincular Código</h1>
                    </div>
                </div>
            </header>

            <div className="p-4 space-y-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar produto pendente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border-2 border-slate-100 focus:border-emerald-500 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-900 outline-none transition-all shadow-sm"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="bg-white p-4 rounded-2xl border-2 border-slate-100 animate-pulse h-24" />
                        ))
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white border-2 border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-sm group transition-all"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={getImageUrl(product.images[0].url) || ""}
                                                alt={product.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <QrCode className="w-6 h-6 opacity-50" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-black text-slate-900 text-sm truncate">{product.title}</h3>
                                            <div className="px-1.5 py-0.5 bg-rose-50 rounded-md shrink-0">
                                                <AlertCircle className="w-3 h-3 text-rose-500" />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {!product.barcode && (
                                                <span className="text-[9px] font-black bg-slate-50 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-tighter shrink-0">Falta EAN</span>
                                            )}
                                            {!product.sku && (
                                                <span className="text-[9px] font-black bg-slate-50 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-tighter shrink-0">Falta SKU</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0 ml-4">
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setIsScannerOpen(true);
                                        }}
                                        className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white active:scale-95 transition-all shadow-sm"
                                        title="Escanear"
                                    >
                                        <QrCode className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setIsManualInputOpen(true);
                                        }}
                                        className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white active:scale-95 transition-all shadow-sm"
                                        title="Digitar"
                                    >
                                        <Barcode className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <Check className="w-12 h-12 text-emerald-500 mx-auto mb-4 opacity-20" />
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Tudo pronto!</p>
                            <p className="text-[10px] font-bold text-slate-300 uppercase">Nenhum produto sem identificador.</p>
                        </div>
                    )}
                </div>
            </div>

            <ScannerModal
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={handleScan}
                title={`Vincular a: ${selectedProduct?.title || ""}`}
            />

            {scannedCode && selectedProduct && (
                <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10">
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                                    {selectedProduct.images && selectedProduct.images.length > 0 ? (
                                        <img
                                            src={getImageUrl(selectedProduct.images[0].url) || ""}
                                            alt={selectedProduct.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <QrCode className="w-6 h-6 opacity-50" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-slate-900 text-lg leading-tight truncate">{selectedProduct.title}</h3>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Vincular Código</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 mb-8">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Código Detectado</span>
                                <span className="text-2xl font-black text-slate-900 break-all">{scannedCode}</span>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    onClick={() => confirmLink("barcode")}
                                    disabled={updating}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-emerald-100 active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {updating ? "Salvando..." : "Salvar como EAN"}
                                </button>
                                <button
                                    onClick={() => confirmLink("sku")}
                                    disabled={updating}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {updating ? "Salvando..." : "Salvar como SKU"}
                                </button>
                                <button
                                    onClick={() => setScannedCode(null)}
                                    className="w-full bg-slate-50 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-[0.98] transition-all"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isManualInputOpen && selectedProduct && (
                <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-[24px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex flex-col gap-1 mb-6">
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Entrada Manual</h3>
                                <p className="text-slate-500 text-xs font-medium">Digite o EAN ou SKU para {selectedProduct.title}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Código do Produto</label>
                                    <input
                                        type="text"
                                        autoFocus
                                        value={manualCode}
                                        onChange={(e) => setManualCode(e.target.value)}
                                        placeholder="Ex: 789123..."
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:border-slate-900 outline-none transition-all placeholder:text-slate-300"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <button
                                        onClick={() => {
                                            if (manualCode.trim()) {
                                                handleScan(manualCode.trim());
                                                setIsManualInputOpen(false);
                                                setManualCode("");
                                            }
                                        }}
                                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-[0.98] transition-all"
                                    >
                                        Continuar
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsManualInputOpen(false);
                                            setManualCode("");
                                        }}
                                        className="w-full bg-slate-50 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-[0.98] transition-all"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
