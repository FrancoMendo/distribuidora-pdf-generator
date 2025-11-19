import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ProductGrid } from './components/ProductGrid';
import { CatalogPDF } from './components/CatalogPDF';
import type { Product } from './types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FileDown, RefreshCw, PackageOpen } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleDataLoaded = (data: Product[]) => {
    setProducts(data);
  };

  const handleReset = () => {
    setProducts([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <PackageOpen className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Generador de Catálogo</h1>
              <p className="text-blue-100 text-sm mt-1">Convierte tu Excel en un PDF profesional al instante</p>
            </div>
          </div>

          {products.length > 0 && (
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Nuevo</span>
              </button>
              <PDFDownloadLink
                document={<CatalogPDF products={products} />}
                fileName="catalogo_productos.pdf"
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-blue-700 bg-white rounded-md hover:bg-blue-50 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              >
                {({ loading }) => (
                  <>
                    <FileDown className="w-4 h-4" />
                    {loading ? 'Generando...' : 'Descargar PDF'}
                  </>
                )}
              </PDFDownloadLink>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Comienza subiendo tu inventario</h2>
              <p className="text-gray-500 mb-8">
                Sube un archivo Excel (.xlsx) con las columnas <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">nombre</span>, <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">precio</span> y <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">linkImage</span>.
              </p>
              <FileUpload onDataLoaded={handleDataLoaded} />
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <ProductGrid products={products} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Distribuidora PDF Generator. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

export default App;
