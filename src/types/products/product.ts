import { ReactNode } from "react";

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
}

export interface ProductVariant {
    id: string;
    name: string;
    color: string;
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
