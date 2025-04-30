import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { useRecentProducts } from '../hooks/useRecentProducts';
import ParallaxScrollView from '../components/ParallaxScrollView';
import Button from '../components/ui/Button';
import { LoadingAnimation } from '../components/LoadingAnimation';
import { SuccessAnimation } from '../components/SuccessAnimation';
import { Image } from 'expo-image';
import { featuredProducts, productsByCategory, Product } from '../app/data';

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const productId = typeof params.productId === 'string' ? params.productId : '';
  const { colors } = useAppTheme();
  const { addToCart } = useCart();
  const { recentProducts, addRecentProduct } = useRecentProducts();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('ProductDetail - received productId:', productId);

  const product = featuredProducts.find((p) => p.id === productId);
  
  console.log('ProductDetail - found product:', product ? product.name : 'null');
  
  const relatedProducts = product
    ? (productsByCategory[product.category] || []).filter((p: Product) => p.id !== productId)
    : [];

  const renderProductImage = () => {
    if (!product) return null;
    
    return (
      <View style={styles.imageContainer}>
        <Image 
          source={typeof product.image === 'string' ? { uri: product.image } : product.image} 
          style={styles.productImage} 
          contentFit="cover"
          transition={200}
        />
        <Button
          variant="outline"
          style={styles.backButton as ViewStyle}
          onPress={() => router.back()}
          title=""
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Button>
      </View>
    );
  };

  // Load initial data and handle recent products
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        if (product && mounted) {
          await addRecentProduct(product);
          setTimeout(() => {
            if (mounted) {
              setIsLoading(false);
            }
          }, 500);
        } else if (mounted) {
          setError('Product not found');
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setIsLoading(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [productId]); // Only depend on productId, not the product object

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 800));
      if (!product) {
        throw new Error('Product not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAddToCart = useCallback(() => {
    try {
      if (product) {
        const cartProduct: Product = {
          ...product,
          specifications: Object.entries(product.specifications).reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
        };
        addToCart(cartProduct);
        setShowSuccess(true);
        const timer = setTimeout(() => setShowSuccess(false), 1500);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
    }
  }, [product, addToCart]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LoadingAnimation />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error || 'Product not found'}
        </Text>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          variant="outline"
          style={styles.errorButton}
        />
      </View>
    );
  }

  return (
    <ParallaxScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      headerComponent={renderProductImage()}
      headerHeight={300}
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
    >
      {/* Product Details */}
      <View style={[styles.detailsContainer, { backgroundColor: colors.card }]}>
        {product.brand && (
          <Text style={[styles.brand, { color: colors.text + '80' }]}>
            {product.brand}
          </Text>
        )}
        <Text style={[styles.name, { color: colors.text }]}>
          {product.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.primary }]}>
            ${product.price}
          </Text>
          {product.oldPrice && (
            <Text style={[styles.oldPrice, { color: colors.text + '60' }]}>
              ${product.oldPrice}
            </Text>
          )}
        </View>

        {product.rating !== undefined && (
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= product.rating! ? 'star' : 'star-outline'}
                  size={16}
                  color={colors.primary}
                  style={styles.star}
                />
              ))}
            </View>
            {product.reviews && (
              <Text style={[styles.reviews, { color: colors.text + '80' }]}>
                ({product.reviews} reviews)
              </Text>
            )}
          </View>
        )}

        <Text style={[styles.description, { color: colors.text }]}>
          {product.description}
        </Text>

        {product.specifications && (
          <View style={styles.specifications}>
            <Text style={[styles.specificationsTitle, { color: colors.text }]}>
              Specifications
            </Text>
            {Object.entries(product.specifications).map(([key, value]) => (
              <View key={key} style={styles.specRow}>
                <Text style={[styles.specLabel, { color: colors.text + '80' }]}>
                  {key}
                </Text>
                <Text style={[styles.specValue, { color: colors.text }]}>
                  {value}
                </Text>
              </View>
            ))}
          </View>
        )}

        {showSuccess ? (
          <View style={styles.success}>
            <SuccessAnimation message="Added to cart!" />
          </View>
        ) : (
          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            style={styles.addButton}
          />
        )}
      </View>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <View style={[styles.relatedContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.relatedTitle, { color: colors.text }]}>Related Products</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedList}
          >
            {relatedProducts.map((relatedProduct: Product) => (
              <View
                key={relatedProduct.id}
                style={[styles.relatedItem, { backgroundColor: colors.background }]}
              >
                <Button
                  onPress={() => router.push(`/product-detail?productId=${relatedProduct.id}`)}
                  style={styles.relatedButton}
                  title=""
                >
                  <View>
                    <Image
                      source={typeof relatedProduct.image === 'string' ? { uri: relatedProduct.image } : relatedProduct.image}
                      style={styles.relatedImage}
                      contentFit="cover"
                    />
                    <Text
                      style={[styles.relatedName, { color: colors.text }]}
                      numberOfLines={2}
                    >
                      {relatedProduct.name}
                    </Text>
                    <Text style={[styles.relatedPrice, { color: colors.primary }]}>
                      ${relatedProduct.price}
                    </Text>
                  </View>
                </Button>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 400,
  },
  brand: {
    fontSize: 14,
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    marginRight: 2,
  },
  reviews: {
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  specifications: {
    marginBottom: 24,
  },
  specificationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  specLabel: {
    fontSize: 14,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    marginTop: 8,
  },
  success: {
    marginTop: 16,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  errorButton: {
    marginHorizontal: 32,
  },
  relatedContainer: {
    padding: 16,
    marginTop: 16,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  relatedList: {
    paddingRight: 16,
  },
  relatedItem: {
    width: 140,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  relatedButton: {
    width: '100%',
    height: '100%',
    padding: 0,
  },
  relatedImage: {
    width: '100%',
    height: 140,
    marginBottom: 8,
  },
  relatedName: {
    fontSize: 14,
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});