import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Switch, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAppTheme } from '../../hooks/useAppTheme';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface AppSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  darkMode: boolean;
  locationServices: boolean;
  autoPlay: boolean;
  saveData: boolean;
}

export default function SettingsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const { logout } = useAuth();
  const [settings, setSettings] = useState<AppSettings>({
    pushNotifications: true,
    emailNotifications: true,
    darkMode: false,
    locationServices: true,
    autoPlay: true,
    saveData: false,
  });

  const toggleSetting = (key: keyof AppSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderSwitch = (
    title: string,
    description: string,
    key: keyof AppSettings
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
        <Text><ThemedText style={styles.title}>Settings</ThemedText></Text>
      </View>

      <ThemedView style={styles.section}>
        <Text><ThemedText style={styles.sectionTitle}>Notifications</ThemedText></Text>
        {renderSwitch(
          'Push Notifications',
          'Receive push notifications for orders and updates',
          'pushNotifications'
        )}
        {renderSwitch(
          'Email Notifications',
          'Receive email notifications for orders and updates',
          'emailNotifications'
        )}
      </ThemedView>

      <ThemedView style={styles.section}>
        <Text><ThemedText style={styles.sectionTitle}>Appearance</ThemedText></Text>
        {renderSwitch(
          'Dark Mode',
          'Switch between light and dark theme',
          'darkMode'
        )}
      </ThemedView>

      <ThemedView style={styles.section}>
        <Text><ThemedText style={styles.sectionTitle}>Privacy</ThemedText></Text>
        {renderSwitch(
          'Location Services',
          'Allow app to access your location',
          'locationServices'
        )}
      </ThemedView>

      <ThemedView style={styles.section}>
        <Text><ThemedText style={styles.sectionTitle}>Data Usage</ThemedText></Text>
        {renderSwitch(
          'Auto-play Videos',
          'Automatically play videos in feed',
          'autoPlay'
        )}
        {renderSwitch(
          'Data Saver',
          'Reduce data usage when using the app',
          'saveData'
        )}
      </ThemedView>

      <ThemedView style={styles.section}>
        <Text><ThemedText style={styles.sectionTitle}>About</ThemedText></Text>
        
        <TouchableOpacity 
          style={styles.actionItem}
          onPress={() => {/* Handle terms */}}
        >
          <View style={styles.actionInfo}>
            <Text><ThemedText style={styles.actionTitle}>Terms of Service</ThemedText></Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionItem}
          onPress={() => {/* Handle privacy policy */}}
        >
          <View style={styles.actionInfo}>
            <Text><ThemedText style={styles.actionTitle}>Privacy Policy</ThemedText></Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionItem}
          onPress={() => {/* Handle about */}}
        >
          <View style={styles.actionInfo}>
            <Text><ThemedText style={styles.actionTitle}>About SuperMall</ThemedText></Text>
            <Text><ThemedText style={styles.actionDescription}>Version 1.0.0</ThemedText></Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </ThemedView>

      <Button
        style={styles.signOutButton}
        variant="outline"
        onPress={logout}
      >
        <Text><ThemedText style={styles.signOutText}>Sign Out</ThemedText></Text>
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
  signOutButton: {
    margin: 16,
    height: 56,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});