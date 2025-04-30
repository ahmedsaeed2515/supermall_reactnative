import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function TabLayout() {
  const { colors } = useAppTheme();
  
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text + '80',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
