import { View, Text, StyleSheet, TouchableOpacity, ImageSourcePropType, Platform, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import * as Haptics from 'expo-haptics';
import { memo } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string | ImageSourcePropType;
  category?: string;
  rating?: number;
  reviews?: number;
  oldPrice?: number;
  brand?: string;
  style?: ViewStyle;
}

function ProductCardComponent({
  id,
  name,
  price,
  image,
  category,
  rating,
  reviews,
  oldPrice,
  brand,
  style
}: ProductCardProps) {
  const { colors } = useAppTheme();
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    console.log('ProductCard - navigating to product:', id);
    router.push({
      pathname: '/product-detail',
      params: { productId: id }
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        style
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={typeof image === 'string' ? { uri: image } : image} 
          style={styles.image} 
          contentFit="cover"
          transition={200}
          placeholder={oldPrice ? "L3X+vjxu00xu00WB00WC" : undefined}
        />
        {discount > 0 && (
          <View style={[styles.discountBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        {brand && (
          <Text style={[styles.brand, { color: colors.text + '80' }]}>
            {brand}
          </Text>
        )}
        
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
          {name}
        </Text>

        {category && (
          <Text style={[styles.category, { color: colors.text + '80' }]}>
            {category}
          </Text>
        )}

        {rating !== undefined && (
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= Math.floor(rating) ? 'star' : 'star-outline'}
                  size={12}
                  color={colors.primary}
                  style={styles.star}
                />
              ))}
            </View>
            {reviews !== undefined && (
              <Text style={[styles.reviews, { color: colors.text + '80' }]}>
                ({reviews})
              </Text>
            )}
          </View>
        )}

        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.primary }]}>
            ${price}
          </Text>
          {oldPrice && (
            <Text style={[styles.oldPrice, { color: colors.text + '60' }]}>
              ${oldPrice}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
  },
  brand: {
    fontSize: 12,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    lineHeight: 18,
  },
  category: {
    fontSize: 12,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  star: {
    marginRight: 2,
  },
  reviews: {
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
});

export default memo(ProductCardComponent);