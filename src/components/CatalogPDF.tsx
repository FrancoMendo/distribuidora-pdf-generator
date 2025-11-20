import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { Product } from '../types';
import fondo from '../assets/fondo.jpg';
import logoMarte from '../assets/logo-marte.png';
const colors = {
  dark: '#343A40',
  light: '#F9FAFB',
  blue_extra_light: '#84C5E2',
  blue_dark: '#06294bff',
  slate800: '#1e293b',
  slate600: '#475569',
  slate200: '#e2e8f0',
  slate100: '#f1f5f9',
  white: '#ffffff',
}
const styles = StyleSheet.create({
  page: {
    padding: 20,
    flex: 1,
    display: 'flex',
  },
  header: {
    backgroundColor: colors.white,
    /* paddingBottom: 10, */
  },
  topBar: {
    height: 8,
    width: '100%',
    backgroundColor: colors.slate800,
  },
  headerContent: {
    paddingHorizontal: 40,
    paddingVertical: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoImage: {
    width: 56,
    height: 56,
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleLine1: {
    fontSize: 18,
    fontWeight: 'extrabold',
    color: colors.slate800,
    letterSpacing: -0.5,
    lineHeight: 1,
  },
  titleLine2: {
    fontSize: 18,
    fontWeight: 'extrabold',
    color: colors.slate600,
    letterSpacing: -0.5,
    lineHeight: 1,
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 4,
  },
  contactName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.slate800,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 10,
    fontWeight: 'semibold',
    color: colors.slate600,
  },
  catalogBadge: {
    backgroundColor: colors.slate100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  catalogBadgeText: {
    fontSize: 8,
    fontWeight: 'medium',
    color: colors.slate600,
  },
  bottomBorders: {
    width: '100%',
  },
  border1: {
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: colors.slate800,
    marginTop: 8,
  },
  border2: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.slate200,
    marginTop: 4,
  },
  titleMain: {
    fontSize: 23,
    fontWeight: 800,
    color: colors.blue_dark,
  },
  title: {
    fontSize: 15,
    fontWeight: 400,
    color: colors.blue_dark,
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
    color: colors.dark,
    maxLines: 2,
    textOverflow: 'ellipsis',
  },
  subtitleProduct: {
    fontSize: 10,
    marginBottom: 4,
    color: colors.dark,
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
    /* marginBottom: 5, */
    textAlign: 'center',
    width: "100%",
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate800,
    alignSelf: 'center',
    /* borderWidth: 1, */
    borderRadius: 15,
  },
  categoria: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.light,
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
      <Page size="A4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* HEADER */}
        <View style={styles.header} fixed>
          <View style={styles.topBar} />
          <View style={styles.headerContent}>
            <View style={styles.leftSection}>
              <Image src={logoMarte} style={styles.logoImage} />
              <View style={styles.titleSection}>
                <Text style={styles.titleLine1}>DISTRIBUIDORA</Text>
                <Text style={styles.titleLine2}>MARTE</Text>
              </View>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.contactName}>Manuel Echaniz</Text>
              <Text style={styles.contactPhone}>2478 441460</Text>
              <View style={styles.catalogBadge}>
                <Text style={styles.catalogBadgeText}>Catálogo de Precios</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomBorders}>
            <View style={styles.border1} />
          </View>
        </View>
        {/* END HEADER */}
        <View style={styles.page}>
          {categoriasUnicas.map((categoria, index) => (
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <View key={index} style={[styles.categoriaContainer, { marginTop: index === 0 ? -15 : 10 }]} wrap={false}>
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
                        <Text style={[styles.titleProduct, styles.bold]}>{product.titulo}</Text>
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
