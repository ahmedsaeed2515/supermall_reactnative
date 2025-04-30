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

type PasswordStrength = 'weak' | 'medium' | 'strong';

export default function RegisterScreen() {
  const { colors } = useAppTheme();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

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

  useEffect(() => {
    // Check password strength
    if (!password) {
      setPasswordStrength('weak');
      return;
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    if (isLongEnough && hasLetter && hasNumber && hasSpecial) {
      setPasswordStrength('strong');
    } else if (isLongEnough && ((hasLetter && hasNumber) || (hasLetter && hasSpecial) || (hasNumber && hasSpecial))) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
    }
  }, [password]);

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'strong':
        return '#4CAF50';
      case 'medium':
        return '#FFA000';
      default:
        return '#F44336';
    }
  };

  const handleRegister = async () => {
    Keyboard.dismiss();

    if (!email || !password || !confirmPassword) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      await register(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirm') => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
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
        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
          Sign up to start shopping
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
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />
        </View>

        <View>
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
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />
            <TouchableOpacity onPress={() => togglePasswordVisibility('password')} style={styles.passwordToggle}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.text + '80'}
              />
            </TouchableOpacity>
          </View>
          {password.length > 0 && (
            <View style={styles.passwordStrength}>
              <View style={styles.strengthBars}>
                <View 
                  style={[
                    styles.strengthBar, 
                    { backgroundColor: getPasswordStrengthColor() }
                  ]} 
                />
                <View 
                  style={[
                    styles.strengthBar, 
                    { 
                      backgroundColor: passwordStrength !== 'weak' ? getPasswordStrengthColor() : colors.border,
                      opacity: passwordStrength !== 'weak' ? 1 : 0.5
                    }
                  ]} 
                />
                <View 
                  style={[
                    styles.strengthBar, 
                    { 
                      backgroundColor: passwordStrength === 'strong' ? getPasswordStrengthColor() : colors.border,
                      opacity: passwordStrength === 'strong' ? 1 : 0.5
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.strengthText, { color: getPasswordStrengthColor() }]}>
                {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)} Password
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.text + '80'} style={styles.inputIcon} />
          <TextInput
            ref={confirmPasswordInputRef}
            style={[styles.input, { color: colors.text }]}
            placeholder="Confirm Password"
            placeholderTextColor={colors.text + '80'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            returnKeyType="go"
            onSubmitEditing={handleRegister}
          />
          <TouchableOpacity onPress={() => togglePasswordVisibility('confirm')} style={styles.passwordToggle}>
            <Ionicons
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.text + '80'}
            />
          </TouchableOpacity>
        </View>

        <Button
          title={isLoading ? "" : "Create Account"}
          onPress={handleRegister}
          disabled={isLoading}
          style={styles.button}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </Button>

        {!isKeyboardVisible && (
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.text + '80' }]}>
              Already have an account?{' '}
            </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS !== 'web') {
                    Haptics.selectionAsync();
                  }
                }}
              >
                <Text style={[styles.link, { color: colors.primary }]}>
                  Sign In
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
  passwordStrength: {
    marginTop: -8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  strengthBars: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 4,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
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