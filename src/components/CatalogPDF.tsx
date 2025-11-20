import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { Product } from '../types';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: 'semibold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -10,
    },
    item: {
        width: '33.33%',
        height: 280, // Fixed height to prevent stretching
        padding: 10,
    },
    card: {
        border: '1px solid #e5e7eb',
        borderRadius: 4,
        padding: 0,
        height: '100%',
        backgroundColor: '#ffffff',
    },
    imageContainer: {
        height: 160,
        width: '100%',
        marginBottom: 8,
        /* backgroundColor: '#f3f4f6', */
        borderBottom: '1px solid #e5e7eb',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain', // Changed to contain to ensure image is visible
    },
    content: {
        padding: 8,
        justifyContent: 'space-around',
        flex: 1,
    },
    titleProduct: {
        fontSize: 10,
        marginBottom: 4,
        color: '#111827',
        maxLines: 2,
        textOverflow: 'ellipsis',
    },
    subtitleProduct: {
        fontSize: 10,
        marginBottom: 4,
        color: '#111827',
        maxLines: 2,
        textOverflow: 'ellipsis',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2563eb',
        marginTop: 'auto', // Push to bottom
    },
});

interface CatalogPDFProps {
    products: Product[];
}

export const CatalogPDF: React.FC<CatalogPDFProps> = ({ products }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Distribuidora Marte</Text>
                </View>
                <View style={styles.grid}>
                    {products.map((product, index) => (
                        <View key={index} style={styles.item} wrap={false}>
                            <View style={styles.card}>
                                <View style={styles.imageContainer}>
                                    {/* Ensure valid URL and handle potential CORS issues by user providing accessible URLs */}
                                    {product.linkImage ? (
                                        <Image
                                            style={styles.image}
                                            src={product.linkImage}
                                        />
                                    ) : (
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 8, color: '#9ca3af' }}>No Image</Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.titleProduct}>{product.titulo}</Text>
                                    {product.subtitulo && product.subtitulo.length > 0 && <Text style={styles.subtitleProduct}>{product.subtitulo}</Text>}
                                    <Text style={styles.price}>${product.precio}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};
