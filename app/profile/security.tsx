import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Switch, TextInput, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAppTheme } from '../../hooks/useAppTheme';
import Button from '../../components/ui/Button';

interface SecuritySettings {
  twoFactorAuth: boolean;
  biometricLogin: boolean;
  rememberDevice: boolean;
  loginNotifications: boolean;
}

export default function SecurityScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    biometricLogin: true,
    rememberDevice: true,
    loginNotifications: true,
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const toggleSetting = (key: keyof SecuritySettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderSwitch = (
    title: string,
    description: string,
    key: keyof SecuritySettings
  ) => {
    return (
      <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
        <View style={styles.settingInfo}>
          <ThemedText style={styles.settingTitle}>{title}</ThemedText>
          <ThemedText style={styles.settingDescription}>{description}</ThemedText>
        </View>
        <Switch
          value={settings[key]}
          onValueChange={() => toggleSetting(key)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.background}
        />
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text><ThemedText style={styles.title}>Security</ThemedText></Text>
      </View>

      <ThemedView style={styles.section}>
        <Text><ThemedText style={styles.sectionTitle}>Account Security</ThemedText></Text>

        {renderSwitch(
          'Two-Factor Authentication',
          'Add an extra layer of security to your account',
          'twoFactorAuth'
        )}

        {renderSwitch(
          'Biometric Login',
          'Use fingerprint or face recognition to log in',
          'biometricLogin'
        )}

        {renderSwitch(
          'Remember Device',
          'Stay logged in on this device',
          'rememberDevice'
        )}

        {renderSwitch(
          'Login Notifications',
          'Get notified of new login attempts',
          'loginNotifications'
        )}
      </ThemedView>

      <ThemedView style={styles.section}>
        <Text><ThemedText style={styles.sectionTitle}>Password & Authentication</ThemedText></Text>
        
        <TouchableOpacity 
          style={[styles.actionItem, { borderBottomColor: colors.border }]}
          onPress={() => setShowPasswordModal(true)}
        >
          <View style={styles.actionInfo}>
            <Text><ThemedText style={styles.actionTitle}>Change Password</ThemedText></Text>
            <Text><ThemedText style={styles.actionDescription}>
              Last changed 3 months ago
            </ThemedText></Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionItem}
          onPress={() => {/* Handle recovery options */}}
        >
          <View style={styles.actionInfo}>
            <Text><ThemedText style={styles.actionTitle}>Recovery Options</ThemedText></Text>
            <Text><ThemedText style={styles.actionDescription}>
              Email and phone number verification
            </ThemedText></Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <Text><ThemedText style={styles.sectionTitle}>Sessions</ThemedText></Text>
        
        <TouchableOpacity 
          style={styles.actionItem}
          onPress={() => {/* Handle active sessions */}}
        >
          <View style={styles.actionInfo}>
            <Text><ThemedText style={styles.actionTitle}>Active Sessions</ThemedText></Text>
            <Text><ThemedText style={styles.actionDescription}>
              Manage devices where you're logged in
            </ThemedText></Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </ThemedView>

      <Button
        style={styles.dangerButton}
        variant="secondary"
        onPress={() => {/* Handle account deletion */}}
      >
        <Text><ThemedText style={styles.dangerButtonText}>Delete Account</ThemedText></Text>
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
  section: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  actionInfo: {
    flex: 1,
    marginRight: 16,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  dangerButton: {
    margin: 16,
    height: 56,
  },
  dangerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});