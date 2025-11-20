import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { CatalogPDF } from './CatalogPDF';
import type { Product } from '../types';

interface ProductGridProps {
    products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    const [loading, setLoading] = useState(false);
    const [productsWithImages, setProductsWithImages] = useState<Product[]>([]);
    if (products.length === 0) return null;

    const fetchImage = async (src: string) => {
        try {
            // 1. Hacemos fetch (aquí puedes agregar headers de auth si necesitas)
            const response = await fetch(src);
            const blob = await response.blob();

            // 2. Convertimos a URL local (blob:http://localhost...)
            const objectUrl = URL.createObjectURL(blob);
            return objectUrl;
        } catch (error) {
            console.error("Error cargando imagen para PDF:", error);
        }
    };
    const loadImages = async () => {
        setLoading(true);
        const updatedProducts = await Promise.all(
            products.map(async (product) => {
                const src = product.linkImage;
                const imgData = await fetchImage(src);
                return { ...product, imgData };
            })
        );
        setProductsWithImages(updatedProducts);
        setLoading(false);
    };

    useEffect(() => {
        loadImages();
    }, [products]);

    if (loading) return <div>Cargando imágenes...</div>;


    return (
        <div className="w-full max-w-6xl mx-auto p-4 h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Vista Previa del Catálogo</h2>
            <div className="w-full h-[800px] bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                <PDFViewer width="100%" height="100%" className="border-none">
                    <CatalogPDF products={productsWithImages} />
                </PDFViewer>
            </div>
        </div>
    );
};
