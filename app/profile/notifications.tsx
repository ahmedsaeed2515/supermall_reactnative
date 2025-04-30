import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Switch, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAppTheme } from '../../hooks/useAppTheme';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: 'orders' | 'promotions' | 'account';
}

export default function NotificationsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'order_status',
      title: 'Order Status',
      description: 'Get updates about your order status',
      enabled: true,
      category: 'orders',
    },
    {
      id: 'delivery_updates',
      title: 'Delivery Updates',
      description: 'Receive notifications about your delivery',
      enabled: true,
      category: 'orders',
    },
    {
      id: 'promotions',
      title: 'Promotions',
      description: 'Stay updated with latest deals and offers',
      enabled: false,
      category: 'promotions',
    },
    {
      id: 'price_alerts',
      title: 'Price Alerts',
      description: 'Get notified when items in your wishlist go on sale',
      enabled: true,
      category: 'promotions',
    },
    {
      id: 'security_alerts',
      title: 'Security Alerts',
      description: 'Important updates about your account security',
      enabled: true,
      category: 'account',
    },
    {
      id: 'account_updates',
      title: 'Account Updates',
      description: 'Get notified about important account changes',
      enabled: true,
      category: 'account',
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const renderSection = (category: NotificationSetting['category'], title: string) => {
    const categorySettings = settings.filter(setting => setting.category === category);
    
    return (
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        <ThemedView style={styles.card}>
          {categorySettings.map((setting, index) => (
            <View key={setting.id} style={[
              styles.settingItem,
              index !== categorySettings.length - 1 && styles.settingDivider
            ]}>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingTitle}>{setting.title}</ThemedText>
                <ThemedText style={styles.settingDescription}>{setting.description}</ThemedText>
              </View>
              <Switch
                value={setting.enabled}
                onValueChange={() => toggleSetting(setting.id)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          ))}
        </ThemedView>
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text><ThemedText style={styles.title}>Notifications</ThemedText></Text>
      </View>

      {renderSection('orders', 'Order Updates')}
      {renderSection('promotions', 'Promotions & Deals')}
      {renderSection('account', 'Account & Security')}
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
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
});