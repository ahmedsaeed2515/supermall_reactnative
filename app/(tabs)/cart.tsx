import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../contexts/CartContext';
import { useAppTheme } from '../../hooks/useAppTheme';
import SwipeableRow from '../../components/SwipeableRow';
import QuantityControl from '../../components/ui/QuantityControl';
import Button from '../../components/ui/Button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string | any;
  quantity: number;
  brand?: string;
  rating?: number;
  oldPrice?: number;
}

export default function CartScreen() {
  const { colors } = useAppTheme();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const getDiscountAmount = (item: CartItem) => {
    if (!item.oldPrice) return 0;
    return item.oldPrice - item.price;
  };

  const getTotalDiscount = () => {
    return cart.reduce((total, item) => total + (getDiscountAmount(item) * item.quantity), 0);
  };

  const getTotalBeforeDiscount = () => {
    return cart.reduce((total, item) => 
      total + ((item.oldPrice || item.price) * item.quantity), 0);
  };

  if (cart.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.text }]}>
          Your cart is empty
        </Text>
        <Button
          title="Continue Shopping"
          onPress={() => router.push('/(tabs)')}
          style={styles.continueButton}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {cart.map(item => (
          <SwipeableRow
            key={item.id}
            onDelete={() => removeFromCart(item.id)}
            style={styles.cartItem}
          >
            <View style={[styles.itemContainer, { backgroundColor: colors.card }]}>
              <Image
                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                style={styles.itemImage}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.itemDetails}>
                {item.brand && (
                  <Text style={[styles.itemBrand, { color: colors.text + '80' }]}>
                    {item.brand}
                  </Text>
                )}
                <Text style={[styles.itemName, { color: colors.text }]}>
                  {item.name}
                </Text>
                {item.rating !== undefined && (
                  <View style={styles.ratingContainer}>
                    <View style={styles.stars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={star <= item.rating! ? 'star' : 'star-outline'}
                          size={12}
                          color={colors.primary}
                          style={styles.star}
                        />
                      ))}
                    </View>
                  </View>
                )}
                <View style={styles.priceContainer}>
                  <Text style={[styles.itemPrice, { color: colors.primary }]}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                  {item.oldPrice && (
                    <Text style={[styles.itemOldPrice, { color: colors.text + '60' }]}>
                      ${(item.oldPrice * item.quantity).toFixed(2)}
                    </Text>
                  )}
                </View>
              </View>
              <QuantityControl
                quantity={item.quantity}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
              />
            </View>
          </SwipeableRow>
        ))}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        {getTotalDiscount() > 0 && (
          <>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>
                Subtotal
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                ${getTotalBeforeDiscount().toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.discountLabel, { color: colors.success }]}>
                Total Savings
              </Text>
              <Text style={[styles.discountValue, { color: colors.success }]}>
                -${getTotalDiscount().toFixed(2)}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </>
        )}
        <View style={styles.totalContainer}>
          <Text style={[styles.totalLabel, { color: colors.text }]}>
            Total
          </Text>
          <Text style={[styles.totalAmount, { color: colors.primary }]}>
            ${getTotalPrice().toFixed(2)}
          </Text>
        </View>
        <Button 
          title="Proceed to Checkout" 
          onPress={() => router.push('/checkout')}
          style={styles.checkoutButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  cartItem: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginHorizontal: 12,
  },
  itemBrand: {
    fontSize: 12,
    marginBottom: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingContainer: {
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  itemOldPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
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
  },
  discountLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  discountValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 8,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  continueButton: {
    marginHorizontal: 32,
  },
});