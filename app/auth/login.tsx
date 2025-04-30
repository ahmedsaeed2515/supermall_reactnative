import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  TouchableOpacity, 
  Keyboard, 
  Platform,
  Animated,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import * as Haptics from 'expo-haptics';

export default function LoginScreen() {
  const { colors } = useAppTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Keyboard listeners
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!email || !password) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      setIsLoading(true);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      let errorMessage = 'Failed to login. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
          Sign in to continue shopping
        </Text>
        
        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <Ionicons name="mail-outline" size={20} color={colors.text + '80'} style={styles.inputIcon} />
          <TextInput
            ref={emailInputRef}
            style={[styles.input, { color: colors.text }]}
            placeholder="Email"
            placeholderTextColor={colors.text + '80'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.text + '80'} style={styles.inputIcon} />
          <TextInput
            ref={passwordInputRef}
            style={[styles.input, { color: colors.text }]}
            placeholder="Password"
            placeholderTextColor={colors.text + '80'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoComplete="password"
            returnKeyType="go"
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordToggle}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.text + '80'}
            />
          </TouchableOpacity>
        </View>

        <Button
          title={isLoading ? "" : "Sign In"}
          onPress={handleLogin}
          disabled={isLoading}
          style={styles.button}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </Button>

        {!isKeyboardVisible && (
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.text + '80' }]}>
              Don't have an account?{' '}
            </Text>
            <Link href="/auth/register" asChild>
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS !== 'web') {
                    Haptics.selectionAsync();
                  }
                }}
              >
                <Text style={[styles.link, { color: colors.primary }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 4,
  },
  button: {
    height: 56,
    borderRadius: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
  },
});