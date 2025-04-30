import { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import Button from '../../components/ui/Button';
import ProductCard from '../../components/ui/ProductCard';
import SearchBar from '../../components/ui/SearchBar';
import { categories, brands, featuredProducts, type Product } from '../../app/data';
import { FlashList, ListRenderItem } from '@shopify/flash-list';

const ALL_CATEGORY = 'All';
const availableCategories = [ALL_CATEGORY, ...categories];
const COLUMN_COUNT = 2;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CONTENT_PADDING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - (CONTENT_PADDING * 2) - (CARD_MARGIN * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

export default function ProductScreen() {
  const { colors } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [selectedBrand, setSelectedBrand] = useState('All');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setSelectedBrand('All'); // Reset brand filter when category changes
  }, []);

  const handleBrandSelect = useCallback((brand: string) => {
    setSelectedBrand(brand);
  }, []);

  const filteredProducts = useMemo(() => {
    return featuredProducts.filter((product) => {
      // Search filter
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      // Brand filter
      const matchesBrand =
        selectedBrand === 'All' || product.brand === selectedBrand;

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchQuery, selectedCategory, selectedBrand]);

  const availableBrands = useMemo(() => {
    const brandsInCategory = new Set(['All']);
    featuredProducts.forEach(product => {
      if (selectedCategory === 'All' || product.category === selectedCategory) {
        if (product.brand) {
          brandsInCategory.add(product.brand);
        }
      }
    });
    return Array.from(brandsInCategory);
  }, [selectedCategory]);

  const renderItem: ListRenderItem<Product> = useCallback(({ item }) => (
    <ProductCard
      {...item}
      style={{ width: CARD_WIDTH }}
    />
  ), []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search products, brands, or categories..."
      />

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filters}
      >
        {availableCategories.map((category) => (
          <Button
            key={category}
            title={category}
            onPress={() => handleCategorySelect(category)}
            variant={selectedCategory === category ? 'primary' : 'outline'}
            style={styles.filterButton}
          />
        ))}
      </ScrollView>

      {/* Brands */}
      {availableBrands.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filters}
        >
          {availableBrands.map((brand) => (
            <Button
              key={brand}
              title={brand}
              onPress={() => handleBrandSelect(brand)}
              variant={selectedBrand === brand ? 'primary' : 'outline'}
              style={styles.filterButton}
            />
          ))}
        </ScrollView>
      )}

      <FlashList
        data={filteredProducts}
        renderItem={renderItem}
        estimatedItemSize={300}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.productsGrid}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    maxHeight: 50,
    marginBottom: 8,
  },
  filters: {
    paddingHorizontal: 16,
  },
  filterButton: {
    marginRight: 8,
  },
  productsGrid: {
    padding: CONTENT_PADDING,
  },
});