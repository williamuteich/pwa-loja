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
import { getAdminProductById, updateProduct, getBackendUrl } from "@/src/services/product";
import { getAdminCategories } from "@/src/services/category";
import { getAdminBrands } from "@/src/services/brand";
import { useRouter, useParams } from "next/navigation";
import { Category } from "@/src/types/products/category";
import { Brand } from "@/src/types/products/brand";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [backendUrl, setBackendUrl] = useState("");

    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    const [imageFiles, setImageFiles] = useState<File[]>([]);
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
        brandId: null,
        categoryIds: [],
        createdAt: ""
    });

    useEffect(() => {
        if (!params?.id) return;
        
        const fetchData = async () => {
            try {
                const [catsRes, brdsRes, prodRes, urlRes] = await Promise.all([
                    getAdminCategories(1, 250),
                    getAdminBrands(1, 250),
                    getAdminProductById(params.id),
                    getBackendUrl()
                ]);
                
                setCategories(catsRes.data || []);
                setBrands(brdsRes.data || []);
                setBackendUrl(urlRes);
                
                if (prodRes) {
                    setProduct(prodRes);
                } else {
                    alert("Produto não encontrado.");
                    router.push("/dashboard/products");
                }
            } catch (error) {
                console.error("Erro ao buscar dados do produto admin:", error);
            } finally {
                setIsMounted(true);
            }
        };
        fetchData();
    }, [params?.id, router]);

    if (!isMounted) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black text-slate-400 uppercase tracking-widest animate-pulse">Carregando...</div>;
    }

    const handleSubmit = async () => {
        if (!params?.id) return;
        
        setLoading(true);
        try {
            const formData = new FormData();

            const hasVariants = (product.variants || []).length > 0;
            const finalQuantity = hasVariants
                ? (product.variants || []).reduce((acc, curr: any) => acc + (curr.stock || 0), 0)
                : (product.quantity || 0);

            formData.append("title", product.title);
            formData.append("description", product.description || "");
            formData.append("price", (product.price || 0).toString());

            if (product.discountPrice !== null) {
                formData.append("discountPrice", product.discountPrice.toString());
            }

            formData.append("quantity", finalQuantity.toString());
            formData.append("isActive", String(product.isActive));
            formData.append("barcode", product.barcode || "");
            formData.append("sku", product.sku || "");
            formData.append("costPrice", (product.costPrice || 0).toString());

            if (product.brandId) {
                formData.append("brandId", product.brandId);
            }

            formData.append("categoryIds", JSON.stringify(product.categoryIds || []));

            const specsString = Object.entries(product.specs || {})
                .filter(([key]) => key !== 'brand')
                .map(([key, val]) => `${key}: ${val}`)
                .join(", ");
            formData.append("specs", specsString);

            const mappedVariants = (product.variants || []).map(v => ({
                name: v.name,
                color: v.color,
                quantity: v.stock
            }));
            formData.append("variants", JSON.stringify(mappedVariants));

            imageFiles.forEach((file) => {
                formData.append("files", file);
            });

            const result = await updateProduct(params.id, formData);

            if (result.error) {
                alert(result.error);
            } else {
                alert("Produto atualizado com sucesso!");
                router.push("/dashboard/products");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar produto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pb-40">
            <header className="bg-white border-b border-slate-100 px-4 py-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/products" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 active:scale-95 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Catálogo</p>
                        <h1 className="text-base font-black text-slate-900 tracking-tight leading-none">Editar Produto</h1>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    <Save className="w-3.5 h-3.5" />
                    {loading ? "Atualizando..." : "Atualizar"}
                </button>
            </header>

            <div className="flex flex-col gap-4 p-4">
                <ProductMedia product={product} setProduct={setProduct} setImageFiles={setImageFiles} backendUrl={backendUrl} />
                <ProductInfo product={product} setProduct={setProduct} />
                <ProductPricing product={product} setProduct={setProduct} />
                <ProductClassification
                    product={product}
                    setProduct={setProduct}
                    categories={categories}
                    brands={brands}
                />
                <ProductInventory product={product} setProduct={setProduct} />
                <ProductVariants product={product} setProduct={setProduct} />
                <ProductVisibility product={product} setProduct={setProduct} />
            </div>
        </div>
    );
}
