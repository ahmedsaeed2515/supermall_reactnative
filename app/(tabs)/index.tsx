import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import ProductCard from '../../components/ui/ProductCard';
import Button from '../../components/ui/Button';
import { categories, featuredProducts, newArrivals, bestSellers, specialOffers } from '../../app/data';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const handleCategoryPress = (category: string) => {
    router.push({ pathname: '/(tabs)/product', params: { category } });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Categories */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <Button
              key={category}
              title={category}
              onPress={() => handleCategoryPress(category)}
              variant="outline"
              style={styles.categoryButton}
            />
          ))}
        </ScrollView>
      </View>

      {/* Special Offers */}
      {specialOffers.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Special Offers
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          >
            {specialOffers.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Best Sellers */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Best Sellers
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsContainer}
        >
          {bestSellers.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Featured Products
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsContainer}
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ScrollView>
      </View>

      {/* New Arrivals */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          New Arrivals
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsContainer}
        >
          {newArrivals.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    marginHorizontal: 4,
  },
  productsContainer: {
    paddingHorizontal: 12,
  },
});
