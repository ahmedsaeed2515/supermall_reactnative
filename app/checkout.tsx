import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useCart } from '../contexts/CartContext';
import { useAppTheme } from '../hooks/useAppTheme';
import Collapsible from '../components/Collapsible';
import Button from '../components/ui/Button';
import { Image } from 'expo-image';
import { LoadingAnimation } from '../components/LoadingAnimation';
import { SuccessAnimation } from '../components/SuccessAnimation';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string | any;
  quantity: number;
  brand?: string;
  oldPrice?: number;
}

export default function CheckoutScreen() {
  const { colors } = useAppTheme();
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  });

  const getDiscountAmount = (item: CartItem) => {
    if (!item.oldPrice) return 0;
    return (item.oldPrice - item.price) * item.quantity;
  };

  const subtotal = cart.reduce((total, item) => 
    total + ((item.oldPrice || item.price) * item.quantity), 0);
  const totalDiscount = cart.reduce((total, item) => 
    total + getDiscountAmount(item), 0);
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = (subtotal - totalDiscount) * 0.1;
  const total = subtotal - totalDiscount + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    if (!Object.values(formData).every(value => value.trim())) {
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();
    setTimeout(() => {
      router.replace('/');
    }, 2000);
  };

  if (isProcessing) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LoadingAnimation />
        <Text style={[styles.statusText, { color: colors.text }]}>
          Processing your order...
        </Text>
      </View>
    );
  }

  if (isSuccess) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <SuccessAnimation message="Order placed successfully!" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: colors.text }]}>Checkout</Text>

      {/* Order Summary */}
      <Collapsible title="Order Summary" initiallyExpanded>
        {cart.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Image
              source={typeof item.image === 'string' ? { uri: item.image } : item.image}
              style={styles.itemImage}
              contentFit="cover"
            />
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: colors.text }]}>
                {item.name}
              </Text>
              {item.brand && (
                <Text style={[styles.itemBrand, { color: colors.text + '80' }]}>
                  {item.brand}
                </Text>
              )}
              <View style={styles.itemPriceContainer}>
                <Text style={[styles.itemQuantity, { color: colors.text }]}>
                  {item.quantity}x
                </Text>
                <Text style={[styles.itemPrice, { color: colors.text }]}>
                  ${item.price}
                </Text>
                {item.oldPrice && (
                  <Text style={[styles.itemOldPrice, { color: colors.text + '60' }]}>
                    ${item.oldPrice}
                  </Text>
                )}
              </View>
            </View>
            <Text style={[styles.itemTotal, { color: colors.text }]}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.text }]}>
            Subtotal
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>
        {totalDiscount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={[styles.discountLabel, { color: colors.success }]}>
              Discount
            </Text>
            <Text style={[styles.discountValue, { color: colors.success }]}>
              -${totalDiscount.toFixed(2)}
            </Text>
          </View>
        )}
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.text }]}>
            Shipping {subtotal > 100 && '(Free over $100)'}
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            ${shipping.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.text }]}>
            Tax (10%)
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            ${tax.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: colors.text }]}>
            Total
          </Text>
          <Text style={[styles.totalValue, { color: colors.primary }]}>
            ${total.toFixed(2)}
          </Text>
        </View>
      </Collapsible>

      {/* Shipping Information */}
      <Collapsible title="Shipping Information" initiallyExpanded>
        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="Full Name"
          placeholderTextColor={colors.text + '80'}
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <TextInput
          style={[styles.input, {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="Email"
          placeholderTextColor={colors.text + '80'}
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <TextInput
          style={[styles.input, {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="Address"
          placeholderTextColor={colors.text + '80'}
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />
        <TextInput
          style={[styles.input, {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="City"
          placeholderTextColor={colors.text + '80'}
          value={formData.city}
          onChangeText={(text) => handleInputChange('city', text)}
        />
        <TextInput
          style={[styles.input, {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="Phone Number"
          placeholderTextColor={colors.text + '80'}
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
        />
      </Collapsible>

      {/* Payment */}
      <Collapsible title="Payment Method" initiallyExpanded>
        <Text style={[styles.paymentNote, { color: colors.text + '80' }]}>
          This is a demo app. No actual payment will be processed.
        </Text>
      </Collapsible>

      <Button
        title="Place Order"
        onPress={handleCheckout}
        style={styles.checkoutButton}
      />
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemBrand: {
    fontSize: 12,
    marginBottom: 4,
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemQuantity: {
    marginRight: 8,
  },
  itemPrice: {
    marginRight: 8,
  },
  itemOldPrice: {
    textDecorationLine: 'line-through',
    fontSize: 12,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  discountLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  discountValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  paymentNote: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  checkoutButton: {
    marginTop: 24,
  },
  statusText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});