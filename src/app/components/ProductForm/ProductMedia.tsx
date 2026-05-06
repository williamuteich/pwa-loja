import React from "react";
import { Product, ProductImage } from "@/src/types/products/product";
import { ImageIcon, Camera, Plus, X, UploadCloud } from "lucide-react";
import { useRef } from "react";

interface ProductMediaProps {
    product: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product>>;
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const ProductMedia: React.FC<ProductMediaProps> = ({
    product,
    setProduct,
    setImageFiles,
}) => {
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const images = product.images || [];

    const handleFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const newFiles = Array.from(files);

        if (typeof setImageFiles === 'function') {
            setImageFiles((prev) => [...prev, ...newFiles].slice(0, 6));
        }

        const newImages: ProductImage[] = newFiles.map((file) => ({
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: URL.createObjectURL(file),
            productId: "",
        }));

        setProduct((prev) => ({
            ...prev,
            images: [...(prev.images || []), ...newImages].slice(0, 6),
        }));

        if (galleryInputRef.current) galleryInputRef.current.value = "";
        if (cameraInputRef.current) cameraInputRef.current.value = "";
    };

    const removeImage = (index: number) => {
        const imgToRemove = images[index];
        if (imgToRemove?.url.startsWith("blob:")) {
            URL.revokeObjectURL(imgToRemove.url);
        }

        if (typeof setImageFiles === 'function') {
            setImageFiles((prev) => prev.filter((_, i) => i !== index));
        }

        setProduct((prev) => ({
            ...prev,
            images: (prev.images || []).filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Fotos do Produto</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Primeira foto = principal</p>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                        {images.length}/6
                    </span>
                </div>

                <input
                    type="file"
                    ref={galleryInputRef}
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />

                <input
                    type="file"
                    ref={cameraInputRef}
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />

                <div className="grid grid-cols-3 gap-3">
                    {images.map((img, i) => (
                        <div
                            key={img.id}
                            className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50"
                        >
                            <img
                                src={img.url}
                                alt={`Preview ${i}`}
                                className="w-full h-full object-cover"
                            />
                            {i === 0 && (
                                <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-[9px] font-black uppercase text-center py-1 tracking-widest z-10">
                                    Principal
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeImage(i);
                                }}
                                className="absolute top-1.5 right-1.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-rose-500 shadow-sm active:scale-90 transition-transform z-20"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}

                    {images.length < 6 && (
                        <button
                            type="button"
                            onClick={() => galleryInputRef.current?.click()}
                            className="aspect-square border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform"
                        >
                            <Plus className="w-5 h-5 text-blue-500" />
                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Add</span>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-wider active:scale-[0.98] transition-transform shadow-lg shadow-slate-200"
                    >
                        <Camera className="w-5 h-5" />
                        Tirar Foto
                    </button>
                    <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-[0.98] transition-transform"
                    >
                        <UploadCloud className="w-5 h-5" />
                        Abrir Galeria
                    </button>
                </div>
            </div>
        </div>
    );
};