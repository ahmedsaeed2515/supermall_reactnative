import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import HapticTab from '../HapticTab';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity = 99,
}: QuantityControlProps) {
  const { colors } = useAppTheme();

  const canDecrease = quantity > minQuantity;
  const canIncrease = quantity < maxQuantity;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <HapticTab
        onPress={onDecrease}
        disabled={!canDecrease}
        style={styles.button}
      >
        <Ionicons
          name="remove"
          size={20}
          color={canDecrease ? colors.text : colors.text + '40'}
        />
      </HapticTab>

      <View style={[styles.quantityContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.quantity, { color: colors.text }]}>
          {quantity}
        </Text>
      </View>

      <HapticTab
        onPress={onIncrease}
        disabled={!canIncrease}
        style={styles.button}
      >
        <Ionicons
          name="add"
          size={20}
          color={canIncrease ? colors.text : colors.text + '40'}
        />
      </HapticTab>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityContainer: {
    paddingHorizontal: 12,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
});