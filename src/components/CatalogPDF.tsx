import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { Product } from '../types';
import fondo from '../assets/fondo.jpg';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titleMain: {
    fontSize: 23,
    fontWeight: 800,
  },
  title: {
    fontSize: 15,
    fontWeight: 400,
  },
  bold: {
    fontWeight: "bold",
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
  item: {
    width: '33.33%',
    height: 230, // Fixed height to prevent stretching
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
    height: 140,
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
    paddingVertical: 4,
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
  categoriaContainer: {
    marginBottom: 10,
    textAlign: 'center',
    width: "100%",
    height: 25,
    backgroundColor: '#6291f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoria: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
  },
  contactContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    height: '100%',
    width: '100%',
    zIndex: -1,
  },
});

interface CatalogPDFProps {
  products: Product[];
}

export const CatalogPDF: React.FC<CatalogPDFProps> = ({ products }) => {
  const categorias = products.map(product => product.categoria);
  const categoriasUnicas = Array.from(new Set(categorias));
  return (
    <Document>
      <Page size="A4" style={{}}>
        <Image src={fondo} style={styles.backgroundImage} fixed />
        <View style={styles.page}>
          <View style={styles.header}>
            <View style={styles.contactContainer}>
              <Text style={styles.titleMain}>Distribuidora Marte</Text>
            </View>
            <View style={styles.contactContainer}>
              <Text style={[styles.title, styles.bold]}>Manuel Echaniz</Text>
              <Text style={styles.title}><Text style={styles.bold}>Contacto:</Text> 2478 441460</Text>
            </View>
          </View>
          {categoriasUnicas.map((categoria, index) => (
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <View key={index} style={styles.categoriaContainer} wrap={false}>
                <Text style={styles.categoria}>{categoria}</Text>
              </View>
              <View style={styles.grid}>
                {products.filter(product => product.categoria === categoria).map((product, index) => (
                  <View key={index} style={styles.item} wrap={false}>
                    <View style={styles.card}>
                      <View style={styles.imageContainer}>
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
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
};
