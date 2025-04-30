import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { useCart } from '../contexts/CartContext';
import { useAppTheme } from '../hooks/useAppTheme';
import SwipeableRow from '../components/SwipeableRow';
import QuantityControl from '../components/ui/QuantityControl';
import Button from '../components/ui/Button';

export default function CartScreen() {
  const { colors } = useAppTheme();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.text }]}>
          Your cart is empty
        </Text>
        <Link href="/(tabs)" asChild>
          <Button
            title="Continue Shopping"
            variant="outline"
            style={styles.continueButton}
            onPress={() => {}}
          />
        </Link>
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
                source={item.image}
                style={styles.itemImage}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.itemDetails}>
                <Text style={[styles.itemName, { color: colors.text }]}>
                  {item.name}
                </Text>
                <Text style={[styles.itemPrice, { color: colors.primary }]}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
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
        <View style={styles.totalContainer}>
          <Text style={[styles.totalLabel, { color: colors.text }]}>
            Total
          </Text>
          <Text style={[styles.totalAmount, { color: colors.primary }]}>
            ${getTotalPrice().toFixed(2)}
          </Text>
        </View>
        <Link href="/checkout" asChild>
          <Button 
            title="Proceed to Checkout" 
            style={styles.checkoutButton} 
            onPress={() => {}}
          />
        </Link>
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
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
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