"use client"

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { ProductMedia } from "@/src/app/components/ProductForm/ProductMedia";
import { ProductInfo } from "@/src/app/components/ProductForm/ProductInfo";
import { ProductPricing } from "@/src/app/components/ProductForm/ProductPricing";
import { ProductInventory } from "@/src/app/components/ProductForm/ProductInventory";
import { ProductClassification } from "@/src/app/components/ProductForm/ProductClassification";
import { ProductVariants } from "@/src/app/components/ProductForm/ProductVariants";
import { ProductVisibility } from "@/src/app/components/ProductForm/ProductVisibility";
import { useState, useEffect } from "react";
import { Product } from "@/src/types/products/product";

export default function NewProductPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [product, setProduct] = useState<Product>({
        id: "",
        title: "",
        slug: "",
        description: "",
        price: 0,
        discountPrice: null,
        specs: {},
        images: [],
        variants: [],
        quantity: 0,
        barcode: null,
        sku: null,
        costPrice: null,
        promotionStart: null,
        promotionEnd: null,
        isActive: true,
        createdAt: ""
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="min-h-screen bg-slate-50" />;
    }

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        try {
            console.log("Iniciando submissão do produto:", product);
        } catch (error) {
            console.error("Erro na submissão:", error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pb-40">
            <header className="bg-white border-b border-slate-100 px-4 py-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/products"
                        className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 active:scale-95 transition-transform"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">Novo Produto</span>
                        </div>
                        <h1 className="text-base font-black text-slate-900 tracking-tight leading-none">Criar Produto</h1>
                    </div>
                </div>
                <button
                    onClick={() => handleSubmit()}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2"
                >
                    <Save className="w-3.5 h-3.5" />
                    Salvar
                </button>
            </header>

            <div className="flex flex-col gap-4 p-4">
                <ProductMedia product={product} setProduct={setProduct} />
                <ProductInfo product={product} setProduct={setProduct} />
                <ProductPricing product={product} setProduct={setProduct} />
                <ProductInventory product={product} setProduct={setProduct} />
                <ProductClassification product={product} setProduct={setProduct} />
                <ProductVariants product={product} setProduct={setProduct} />
                <ProductVisibility product={product} setProduct={setProduct} />
            </div>
        </div>
    );
}
