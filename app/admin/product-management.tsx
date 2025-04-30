import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAppTheme } from '../../hooks/useAppTheme';
import Button from '../../components/ui/Button';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { SuccessAnimation } from '../../components/SuccessAnimation';

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
];

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string | null;
}

export default function ProductManagementScreen() {
  const { colors } = useAppTheme();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Smartphone',
      price: 699,
      category: 'Electronics',
      description: 'A high-end smartphone with great features.',
      image: null,
    },
  ]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImagePick = async (productId: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProducts(products.map(p => 
        p.id === productId 
          ? { ...p, image: result.assets[0].uri }
          : p
      ));
    }
  };

  const handleSave = async (product: Product) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (selectedProduct) {
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? product : p
      ));
    } else {
      setProducts([...products, { ...product, id: String(products.length + 1) }]);
    }
    
    setSelectedProduct(null);
    setIsLoading(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProducts(products.filter(p => p.id !== id));
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LoadingAnimation />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Processing...
        </Text>
      </View>
    );
  }

  if (showSuccess) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SuccessAnimation message="Product saved successfully!" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Product Management
      </Text>

      {/* Product Form */}
      <View style={[styles.form, { borderColor: colors.border }]}>
        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="Product Name"
          placeholderTextColor={colors.text + '80'}
          value={selectedProduct?.name || ''}
          onChangeText={text => 
            setSelectedProduct(prev => prev ? { ...prev, name: text } : {
              id: '',
              name: text,
              price: 0,
              category: categories[0],
              description: '',
              image: null,
            })
          }
        />

        <TextInput
          style={[styles.input, {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="Price"
          placeholderTextColor={colors.text + '80'}
          keyboardType="numeric"
          value={selectedProduct?.price?.toString() || ''}
          onChangeText={text => 
            setSelectedProduct(prev => 
              prev ? { ...prev, price: parseFloat(text) || 0 } : null
            )
          }
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
        >
          {categories.map(category => (
            <Button
              key={category}
              title={category}
              onPress={() => 
                setSelectedProduct(prev => 
                  prev ? { ...prev, category } : null
                )
              }
              variant={selectedProduct?.category === category ? 'primary' : 'outline'}
              style={styles.categoryButton}
            />
          ))}
        </ScrollView>

        <TextInput
          style={[styles.input, styles.textArea, {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="Description"
          placeholderTextColor={colors.text + '80'}
          multiline
          numberOfLines={4}
          value={selectedProduct?.description || ''}
          onChangeText={text => 
            setSelectedProduct(prev => 
              prev ? { ...prev, description: text } : null
            )
          }
        />

        {selectedProduct && (
          <View style={styles.imageContainer}>
            {selectedProduct.image ? (
              <Image 
                source={{ uri: selectedProduct.image }}
                style={styles.productImage}
              />
            ) : (
              <View style={[styles.imagePlaceholder, { borderColor: colors.border }]} />
            )}
            <Button
              title="Choose Image"
              onPress={() => handleImagePick(selectedProduct.id)}
              variant="outline"
              style={styles.imageButton}
            />
          </View>
        )}

        <View style={styles.actions}>
          <Button
            title={selectedProduct?.id ? 'Update Product' : 'Add Product'}
            onPress={() => selectedProduct && handleSave(selectedProduct)}
            style={styles.actionButton}
          />
          {selectedProduct?.id && (
            <Button
              title="Cancel"
              onPress={() => setSelectedProduct(null)}
              variant="outline"
              style={styles.actionButton}
            />
          )}
        </View>
      </View>

      {/* Products List */}
      <View style={styles.productsList}>
        {products.map(product => (
          <TouchableOpacity
            key={product.id}
            style={[styles.productItem, { borderColor: colors.border }]}
            onPress={() => setSelectedProduct(product)}
          >
            {product.image ? (
              <Image 
                source={{ uri: product.image }}
                style={styles.productThumb}
              />
            ) : (
              <View style={[styles.thumbPlaceholder, { borderColor: colors.border }]} />
            )}
            <View style={styles.productInfo}>
              <Text style={[styles.productName, { color: colors.text }]}>
                {product.name}
              </Text>
              <Text style={[styles.productPrice, { color: colors.primary }]}>
                ${product.price}
              </Text>
              <Text style={[styles.productCategory, { color: colors.text + '80' }]}>
                {product.category}
              </Text>
            </View>
            <Button
              title="Delete"
              onPress={() => handleDelete(product.id)}
              variant="outline"
              style={styles.deleteButton}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  categories: {
    marginBottom: 16,
  },
  categoryButton: {
    marginRight: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  imageButton: {
    width: 150,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  productsList: {
    marginTop: 16,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  productThumb: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  thumbPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
  },
  deleteButton: {
    marginLeft: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});