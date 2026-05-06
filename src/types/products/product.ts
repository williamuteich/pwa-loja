import { ReactNode } from "react";
import { Category } from "./category";
import { Brand } from "./brand";

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    discountPrice: number | null;
    specs: any;
    createdAt: string;
    isActive: boolean;
    images: ProductImage[];
    variants?: ProductVariant[];
    quantity?: number;
    barcode?: string | null;
    sku?: string | null;
    costPrice?: number | null;
    promotionStart?: string | null;
    promotionEnd?: string | null;
    brandId?: string | null;
    categoryIds?: string[];
}

export interface ProductVariant {
    stock?: number | null;
    id: string;
    name: string;
    color?: string | null;
    quantity: number;
    productId: string;
}

export interface ProductImage {
    id: string;
    url: string;
    productId: string;
}

export interface ProductsResponse {
    data: Product[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface ProductFormProps {
    product?: Product | null;
}

export interface ProductCardProps {
    product: Product;
    backendUrl: string;
}

export interface ProductGridProps {
    products: Product[];
    backendUrl: string;
}

export interface RelatedProductsCarouselProps {
    products: Product[];
    backendUrl: string;
}

export interface ProductCarouselProps {
    products: Product[];
    backendUrl: string;
}

export interface ProductsClientProps {
    initialProducts?: Product[];
    productsSlot?: ReactNode;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    backendUrl: string;
    title?: ReactNode;
    subtitle?: string;
}

export interface ProductVariantsProps {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export interface ProductVisibilityProps {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export interface ProductItemProps {
    product: Product
    backendUrl: string
}

export interface ProductInfoProps {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export interface ProductPricingProps {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export interface ProductMediaProps {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export interface ProductInventoryProps {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export interface ProductClassificationProps {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    categories: Category[];
    brands: Brand[];
}