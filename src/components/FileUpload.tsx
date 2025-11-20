import React, { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Product } from '../types';

interface FileUploadProps {
    onDataLoaded: (data: Product[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const processFile = (file: File) => {
        setError(null);
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target?.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json<Product>(ws);
                console.log({ data })

                // Validate data
                const validData = data.filter(item => item.titulo && item.precio && item.linkImage);

                if (validData.length === 0) {
                    setError('No se encontraron productos válidos. Verifica las columnas.');
                    return;
                }

                onDataLoaded(validData);
            } catch (err) {
                setError('Error al procesar el archivo. Asegúrate de que sea un Excel válido.');
                console.error(err);
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    }, [onDataLoaded]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
            processFile(file);
        } else {
            setError('Por favor sube un archivo Excel (.xlsx o .xls)');
        }
    };

    return (
        <div className="w-full">
            <label
                className={`
          relative flex flex-col items-center justify-center w-full h-64 
          rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
          ${isDragging
                        ? 'border-blue-500 bg-blue-50 scale-[1.02]'
                        : 'border-gray-300 bg-gray-50 hover:bg-blue-50/50 hover:border-blue-400'
                    }
          ${error ? 'border-red-300 bg-red-50' : ''}
        `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <div className={`
            p-4 rounded-full mb-4 transition-colors duration-300
            ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-400 shadow-sm'}
            ${error ? 'bg-red-100 text-red-500' : ''}
          `}>
                        {error ? <AlertCircle className="w-10 h-10" /> : <Upload className="w-10 h-10" />}
                    </div>

                    <p className="mb-2 text-lg font-semibold text-gray-700">
                        {isDragging ? 'Suelta el archivo aquí' : 'Haz clic o arrastra tu archivo'}
                    </p>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                        Soporta archivos .xlsx y .xls
                    </p>

                    {error && (
                        <div className="mt-4 text-sm font-medium text-red-600 bg-red-100 px-4 py-2 rounded-full animate-pulse">
                            {error}
                        </div>
                    )}
                </div>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </label>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <FileSpreadsheet className="w-6 h-6 text-green-600 mb-2" />
                    <span className="text-xs font-medium text-gray-600">Excel Estándar</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 mb-2" />
                    <span className="text-xs font-medium text-gray-600">Validación Auto</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Upload className="w-6 h-6 text-purple-600 mb-2" />
                    <span className="text-xs font-medium text-gray-600">Carga Rápida</span>
                </div>
            </div>
        </div>
    );
};
