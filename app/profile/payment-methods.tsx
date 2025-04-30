import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAppTheme } from '../../hooks/useAppTheme';
import Button from '../../components/ui/Button';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  isDefault: boolean;
  brand: string;
}

// Mock data - replace with real data from your API
const initialPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit',
    cardNumber: '•••• •••• •••• 4242',
    expiryDate: '12/25',
    cardHolder: 'John Doe',
    isDefault: true,
    brand: 'visa',
  },
  {
    id: '2',
    type: 'debit',
    cardNumber: '•••• •••• •••• 5555',
    expiryDate: '09/24',
    cardHolder: 'John Doe',
    isDefault: false,
    brand: 'mastercard',
  },
];

const getCardIcon = (brand: string) => {
  switch (brand.toLowerCase()) {
    case 'visa':
      return 'card';
    case 'mastercard':
      return 'card-outline';
    case 'amex':
      return 'card';
    default:
      return 'card-outline';
  }
};

export default function PaymentMethodsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState<Partial<PaymentMethod>>({});

  const handleAddMethod = () => {
    setEditingMethod(null);
    setFormData({});
    setModalVisible(true);
  };

  const handleEditMethod = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData(method);
    setModalVisible(true);
  };

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods => methods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })));
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleSaveMethod = () => {
    if (editingMethod) {
      setPaymentMethods(methods => methods.map(method => 
        method.id === editingMethod.id ? { ...method, ...formData } : method
      ));
    } else {
      const newMethod: PaymentMethod = {
        ...formData as PaymentMethod,
        id: uuidv4(),
        isDefault: paymentMethods.length === 0,
      };
      setPaymentMethods([...paymentMethods, newMethod]);
    }
    setModalVisible(false);
  };

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text><ThemedText style={styles.title}>Payment Methods</ThemedText></Text>
        </View>

        <View style={styles.cardList}>
          {paymentMethods.map((method) => (
            <ThemedView key={method.id} style={styles.cardItem}>
              {method.isDefault && (
                <View style={[styles.defaultBadge, { backgroundColor: colors.primary }]}>
                  <Text><ThemedText style={styles.defaultText}>Default</ThemedText></Text>
                </View>
              )}

              <View style={styles.cardHeader}>
                <Ionicons 
                  name={getCardIcon(method.brand)} 
                  size={32} 
                  color={colors.primary} 
                />
                <ThemedText style={styles.cardType}>
                  {method.brand.toUpperCase()}
                </ThemedText>
              </View>

              <ThemedText style={styles.cardNumber}>
                {method.cardNumber}
              </ThemedText>

              <View style={styles.cardInfo}>
                <View>
                  <Text><ThemedText style={styles.infoLabel}>Card Holder</ThemedText></Text>
                  <Text><ThemedText style={styles.infoValue}>{method.cardHolder}</ThemedText></Text>
                </View>
                <View>
                  <Text><ThemedText style={styles.infoLabel}>Expires</ThemedText></Text>
                  <Text><ThemedText style={styles.infoValue}>{method.expiryDate}</ThemedText></Text>
                </View>
              </View>

              <View style={styles.cardActions}>
                {!method.isDefault && (
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: colors.primary + '10' }]}
                    onPress={() => handleSetDefault(method.id)}
                  >
                    <Ionicons name="checkmark-circle-outline" size={20} color={colors.primary} />
                    <Text><ThemedText style={[styles.actionText, { color: colors.primary }]}>
                      Set as Default
                    </ThemedText></Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleEditMethod(method)}
                >
                  <Ionicons name="create-outline" size={20} color={colors.text} />
                  <Text><ThemedText style={styles.actionText}>Edit</ThemedText></Text>
                </TouchableOpacity>

                {!method.isDefault && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleDeleteMethod(method.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color={colors.text} />
                    <Text><ThemedText style={styles.actionText}>Delete</ThemedText></Text>
                  </TouchableOpacity>
                )}
              </View>
            </ThemedView>
          ))}
        </View>

        <Button
          onPress={handleAddMethod}
          style={styles.addButton}
        >
          <View style={styles.addButtonContent}>
            <Ionicons name="add" size={24} color="white" />
            <Text><ThemedText style={styles.addButtonText}>Add Payment Method</ThemedText></Text>
          </View>
        </Button>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <ThemedView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text><ThemedText style={styles.modalTitle}>
                {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
              </ThemedText></Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.form}>
              <View style={styles.inputGroup}>
                <Text><ThemedText style={styles.label}>Card Number</ThemedText></Text>
                <TextInput
                  style={[styles.input, { 
                    color: colors.text,
                    backgroundColor: colors.card,
                  }]}
                  value={formData.cardNumber}
                  onChangeText={(text) => {
                    const formatted = formatCardNumber(text.replace(/[^\d]/g, ''));
                    setFormData({ ...formData, cardNumber: formatted });
                  }}
                  placeholder="Enter card number"
                  placeholderTextColor={colors.text + '80'}
                  keyboardType="number-pad"
                  maxLength={19}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text><ThemedText style={styles.label}>Expiry Date</ThemedText></Text>
                  <TextInput
                    style={[styles.input, { 
                      color: colors.text,
                      backgroundColor: colors.card,
                    }]}
                    value={formData.expiryDate}
                    onChangeText={(text) => {
                      let formatted = text.replace(/[^\d]/g, '');
                      if (formatted.length >= 2) {
                        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
                      }
                      setFormData({ ...formData, expiryDate: formatted });
                    }}
                    placeholder="MM/YY"
                    placeholderTextColor={colors.text + '80'}
                    maxLength={5}
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text><ThemedText style={styles.label}>CVV</ThemedText></Text>
                  <TextInput
                    style={[styles.input, { 
                      color: colors.text,
                      backgroundColor: colors.card,
                    }]}
                    placeholder="CVV"
                    placeholderTextColor={colors.text + '80'}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text><ThemedText style={styles.label}>Card Holder Name</ThemedText></Text>
                <TextInput
                  style={[styles.input, { 
                    color: colors.text,
                    backgroundColor: colors.card,
                  }]}
                  value={formData.cardHolder}
                  onChangeText={(text) => setFormData({ ...formData, cardHolder: text })}
                  placeholder="Enter cardholder name"
                  placeholderTextColor={colors.text + '80'}
                  autoCapitalize="characters"
                />
              </View>
            </ScrollView>

            <Button
              onPress={handleSaveMethod}
              style={styles.saveButton}
              disabled={!formData.cardNumber || !formData.expiryDate || !formData.cardHolder}
            >
              <Text><ThemedText style={styles.saveButtonText}>
                {editingMethod ? 'Save Changes' : 'Add Card'}
              </ThemedText></Text>
            </Button>
          </ThemedView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardList: {
    padding: 16,
  },
  cardItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  defaultBadge: {
    position: 'absolute',
    right: 16,
    top: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 16,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  actionText: {
    fontSize: 14,
  },
  addButton: {
    margin: 16,
    height: 56,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.7,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  saveButton: {
    margin: 16,
    height: 56,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});