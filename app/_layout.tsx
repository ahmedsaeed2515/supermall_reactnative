import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { CartProvider } from '../contexts/CartContext';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext';

function RootLayoutNav() {
  const { isAuthenticated, isAdmin } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';
    
    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/auth/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to admin or user area based on admin status
      if (isAdmin) {
        router.replace('/admin/product-management');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, isAdmin, segments]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ 
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name="auth/register" options={{ 
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name="admin/product-management" options={{
        title: 'Product Management',
        headerBackVisible: false
      }} />
      <Stack.Screen name="product-detail" options={{ 
        title: 'Product Details',
        presentation: 'card'
      }} />
      <Stack.Screen name="checkout" options={{ 
        title: 'Checkout',
        presentation: 'modal'
      }} />
      <Stack.Screen name="profile/settings" options={{ 
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name="profile/addresses" options={{ 
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name="profile/payment-methods" options={{ 
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name="profile/notifications" options={{ 
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name="profile/personal-info" options={{ 
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name="profile/security" options={{ 
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name="orders" options={{ 
        title: 'Order History',
        presentation: 'modal'
      }} />
      <Stack.Screen name="wishlist" options={{ 
        title: 'My Wishlist',
        presentation: 'modal'
      }} />
      <Stack.Screen name="recommendations" options={{ 
        title: 'Recommended for You',
        presentation: 'modal'
      }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <RootLayoutNav />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
