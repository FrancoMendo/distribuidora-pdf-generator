import React from 'react';
import type { Product } from '../types';

interface ProductGridProps {
    products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    if (products.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Vista Previa del Catálogo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                            <img
                                src={product.linkImage}
                                alt={product.nombre}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{product.nombre}</h3>
                            <p className="text-xl font-bold text-blue-600">{product.precio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
