import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../../hooks/useAppTheme';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Image } from 'expo-image';

export default function ProfileScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Implement your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const profileSections: { icon: string; title: string; description: string; route: "/profile/personal-info" | "/profile/addresses" | "/profile/payment-methods" | "/profile/notifications" | "/profile/security" | "/profile/settings" }[] = [
    {
      icon: 'person-outline',
      title: 'Personal Information',
      description: 'Manage your profile details',
      route: '/profile/personal-info'
    },
    {
      icon: 'location-outline',
      title: 'Shipping Addresses',
      description: 'Manage your delivery locations',
      route: '/profile/addresses'
    },
    {
      icon: 'card-outline',
      title: 'Payment Methods',
      description: 'Manage your payment options',
      route: '/profile/payment-methods'
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      description: 'Customize your notifications',
      route: '/profile/notifications'
    },
    {
      icon: 'shield-outline',
      title: 'Security',
      description: 'Password and authentication',
      route: '/profile/security'
    },
    {
      icon: 'settings-outline',
      title: 'Settings',
      description: 'App preferences and more',
      route: '/profile/settings'
    }
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.text}
        />
      }
    >
      {/* Profile Header */}
      <ThemedView style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: user?.photoURL || 'https://ui-avatars.com/api/?name=' + (user?.displayName || 'User') }}
            style={styles.profileImage}
            contentFit="cover"
          />
          <View style={styles.nameContainer}>
            <ThemedText style={styles.name}>{user?.displayName || 'User'}</ThemedText>
            <ThemedText style={styles.email}>{user?.email}</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionItem}
          // onPress={() => router.push('/orders')
          onPress={() => router.push('/+not-found')

          }
        >
          <Ionicons name="receipt-outline" size={24} color={colors.primary} />
          <ThemedText style={styles.actionLabel}>Orders</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionItem}
          // onPress={() => router.push('/wishlist')
          onPress={() => router.push('/+not-found')
          }
        >
          <Ionicons name="heart-outline" size={24} color={colors.primary} />
          <ThemedText style={styles.actionLabel}>Wishlist</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionItem}
          // onPress={() => router.push('/recommendations')
          onPress={() => router.push('/+not-found')
          }
        >
          <Ionicons name="star-outline" size={24} color={colors.primary} />
          <ThemedText style={styles.actionLabel}>For You</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Profile Sections */}
      <ThemedView style={styles.sections}>
        {profileSections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sectionButton}
            onPress={() => router.push(section.route)}
          >
            <View style={styles.sectionContent}>
              {/* <Ionicons name={section.icon} size={24} color={colors.text} /> */}
              <View style={styles.sectionText}>
                <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
                <ThemedText style={styles.sectionDescription}>{section.description}</ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.text} />
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameContainer: {
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    opacity: 0.7,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionLabel: {
    marginTop: 8,
    fontSize: 12,
  },
  sections: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionText: {
    marginLeft: 12,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 12,
    opacity: 0.7,
  },
});