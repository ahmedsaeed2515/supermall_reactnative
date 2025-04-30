import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAppTheme } from '../../hooks/useAppTheme';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
}

export default function PersonalInfoScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState<PersonalInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    birthDate: '1990-01-01',
    gender: 'Male',
  });

  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false);
  };

  const renderField = (label: string, value: string, key: keyof PersonalInfo) => {
    return (
      <View style={styles.field}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        {isEditing ? (
          <TextInput
            style={[styles.input, { 
              color: colors.text,
              backgroundColor: colors.card,
            }]}
            value={value}
            onChangeText={(text) => setInfo({ ...info, [key]: text })}
            placeholder={`Enter ${label.toLowerCase()}`}
            placeholderTextColor={colors.text + '80'}
          />
        ) : (
          <ThemedText style={styles.value}>{value}</ThemedText>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text><ThemedText style={styles.title}>Personal Information</ThemedText></Text>
      </View>

      <ThemedView style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user?.photoURL || 'https://ui-avatars.com/api/?name=John+Doe' }}
            style={styles.profileImage}
          />
          <View style={styles.profileActions}>
            <Button
              onPress={() => {/* Handle change photo */}}
              variant="outline"
              title="Change Photo"
            />
          </View>
        </View>

        {renderField('First Name', info.firstName, 'firstName')}
        {renderField('Last Name', info.lastName, 'lastName')}
        {renderField('Email', info.email, 'email')}
        {renderField('Phone', info.phone, 'phone')}
        {renderField('Birth Date', info.birthDate, 'birthDate')}
        {renderField('Gender', info.gender, 'gender')}
      </ThemedView>

      <Button
        style={styles.actionButton}
        onPress={() => isEditing ? handleSave() : setIsEditing(true)}
      >
        <Text><ThemedText style={styles.actionButtonText}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </ThemedText></Text>
      </Button>
    </ScrollView>
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
  profileSection: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 12,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.7,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  actionButton: {
    margin: 16,
    height: 56,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});