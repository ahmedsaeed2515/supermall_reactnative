import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENT_PRODUCTS_KEY = '@recent_products';
const MAX_RECENT_PRODUCTS = 5;

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: any;
}

export function useRecentProducts() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadRecentProducts();
  }, []);

  const loadRecentProducts = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_PRODUCTS_KEY);
      if (stored) {
        setRecentProducts(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recent products:', error);
    }
  };

  const addRecentProduct = async (product: Product) => {
    try {
      const updatedProducts = [
        product,
        ...recentProducts.filter((p) => p.id !== product.id),
      ].slice(0, MAX_RECENT_PRODUCTS);

      setRecentProducts(updatedProducts);
      await AsyncStorage.setItem(
        RECENT_PRODUCTS_KEY,
        JSON.stringify(updatedProducts)
      );
    } catch (error) {
      console.error('Error saving recent product:', error);
    }
  };

  const clearRecentProducts = async () => {
    try {
      setRecentProducts([]);
      await AsyncStorage.removeItem(RECENT_PRODUCTS_KEY);
    } catch (error) {
      console.error('Error clearing recent products:', error);
    }
  };

  return {
    recentProducts,
    addRecentProduct,
    clearRecentProducts,
  };
}