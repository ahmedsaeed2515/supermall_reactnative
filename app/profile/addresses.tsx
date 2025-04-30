import React, { useState } from 'react';
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

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  phone: string;
}

// Mock data - replace with real data from your API
const initialAddresses: Address[] = [
  {
    id: '1',
    name: 'John Doe',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    isDefault: true,
    phone: '+1 (555) 123-4567',
  },
  {
    id: '2',
    name: 'John Doe',
    street: '456 Park Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    country: 'United States',
    isDefault: false,
    phone: '+1 (555) 987-6543',
  },
];

export default function AddressesScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({});

  const handleAddAddress = () => {
    setEditingAddress(null);
    setFormData({});
    setModalVisible(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData(address);
    setModalVisible(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...addr, ...formData } : addr
      ));
    } else {
      // For new addresses, create the id separately from formData
      const newAddress: Address = {
        ...formData as Omit<Address, 'id' | 'isDefault'>,
        id: Date.now().toString(),
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
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
          <Text><ThemedText style={styles.title}>Shipping Addresses</ThemedText></Text>
        </View>

        <View style={styles.addressList}>
          {addresses.map((address) => (
            <ThemedView key={address.id} style={styles.addressCard}>
              {address.isDefault && (
                <View style={[styles.defaultBadge, { backgroundColor: colors.primary }]}>

                  <Text><ThemedText style={styles.defaultText}>Default</ThemedText></Text>
                </View>
              )}
              
              <View style={styles.addressHeader}>
                <Text>
                  <ThemedText style={styles.name}>{address.name}</ThemedText>
                </Text>
                <Text>
                  <ThemedText style={styles.phone}>{address.phone}</ThemedText>
                </Text>
              </View>

              <Text>
                <ThemedText style={styles.addressText}>
                  {address.street}
                  {'\n'}
                  {address.city}, {address.state} {address.zipCode}
                  {'\n'}
                  {address.country}
                </ThemedText>
              </Text>

              <View style={styles.addressActions}>
                {!address.isDefault && (
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: colors.primary + '10' }]}
                    onPress={() => handleSetDefault(address.id)}
                  >
                    <Ionicons name="checkmark-circle-outline" size={20} color={colors.primary} />
                    <Text>
                      <ThemedText style={[styles.actionText, { color: colors.primary }]}>

                        Set as Default
                      </ThemedText>
                    </Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleEditAddress(address)}
                >
                  <Ionicons name="create-outline" size={20} color={colors.text} />
                  <Text><ThemedText style={styles.actionText}>Edit</ThemedText></Text>
                </TouchableOpacity>

                {!address.isDefault && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleDeleteAddress(address.id)}
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
          onPress={handleAddAddress}
          style={styles.addButton}
        >
          <View style={styles.addButtonContent}>
            <Ionicons name="add" size={24} color="white" />
            <Text><ThemedText style={styles.addButtonText}>Add New Address</ThemedText></Text>
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
              <Text>
                <ThemedText style={styles.modalTitle}>
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </ThemedText>
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.form}>
              <View style={styles.inputGroup}>
                <Text><ThemedText style={styles.label}>Full Name</ThemedText></Text>
                <TextInput
                  style={[styles.input, { 
                    color: colors.text,
                    backgroundColor: colors.card,
                  }]}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.text + '80'}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text><ThemedText style={styles.label}>Phone Number</ThemedText></Text>
                <TextInput
                  style={[styles.input, { 
                    color: colors.text,
                    backgroundColor: colors.card,
                  }]}
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  placeholder="Enter your phone number"
                  placeholderTextColor={colors.text + '80'}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text><ThemedText style={styles.label}>Street Address</ThemedText></Text>
                <TextInput
                  style={[styles.input, { 
                    color: colors.text,
                    backgroundColor: colors.card,
                  }]}
                  value={formData.street}
                  onChangeText={(text) => setFormData({ ...formData, street: text })}
                  placeholder="Enter street address"
                  placeholderTextColor={colors.text + '80'}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text><ThemedText style={styles.label}>City</ThemedText></Text>
                  <TextInput
                    style={[styles.input, { 
                      color: colors.text,
                      backgroundColor: colors.card,
                    }]}
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                    placeholder="City"
                    placeholderTextColor={colors.text + '80'}
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text><ThemedText style={styles.label}>State</ThemedText></Text>
                  <TextInput
                    style={[styles.input, { 
                      color: colors.text,
                      backgroundColor: colors.card,
                    }]}
                    value={formData.state}
                    onChangeText={(text) => setFormData({ ...formData, state: text })}
                    placeholder="State"
                    placeholderTextColor={colors.text + '80'}
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text><ThemedText style={styles.label}>ZIP Code</ThemedText></Text>
                  <TextInput
                    style={[styles.input, { 
                      color: colors.text,
                      backgroundColor: colors.card,
                    }]}
                    value={formData.zipCode}
                    onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
                    placeholder="ZIP Code"
                    placeholderTextColor={colors.text + '80'}
                    keyboardType="number-pad"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 2, marginLeft: 8 }]}>
                  <Text><ThemedText style={styles.label}>Country</ThemedText></Text>
                  <TextInput
                    style={[styles.input, { 
                      color: colors.text,
                      backgroundColor: colors.card,
                    }]}
                    value={formData.country}
                    onChangeText={(text) => setFormData({ ...formData, country: text })}
                    placeholder="Country"
                    placeholderTextColor={colors.text + '80'}
                  />
                </View>
              </View>
            </ScrollView>

            <Button
              onPress={handleSaveAddress}
              style={styles.saveButton}
              disabled={!formData.name || !formData.street || !formData.city}
            >
              <Text>
                <ThemedText style={styles.saveButtonText}>
                  {editingAddress ? 'Save Changes' : 'Add Address'}
                </ThemedText>
              </Text>
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
  addressList: {
    padding: 16,
  },
  addressCard: {
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
  addressHeader: {
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    opacity: 0.7,
  },
  addressText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  addressActions: {
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