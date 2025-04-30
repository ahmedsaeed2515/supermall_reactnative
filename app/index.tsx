import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAppTheme } from '../hooks/useAppTheme';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';

// Mock data
const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
];

const featuredProducts = [
  {
    id: '1',
    name: 'Smartphone',
    category: 'Electronics',
    price: 699,
    image: require('../assets/images/icon.png'),
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 199,
    image: require('../assets/images/adaptive-icon.png'),
  },
  {
    id: '3',
    name: 'Laptop Pro',
    category: 'Electronics',
    price: 1299,
    image: require('../assets/images/splash-icon.png'),
  },
];

export default function HomeScreen() {
  const { colors } = useAppTheme();

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: '/product',
      params: { category }
    });
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
          {featuredProducts.slice().reverse().map((product) => (
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