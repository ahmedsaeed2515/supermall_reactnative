import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '../../hooks/useAppTheme';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  children,
}: ButtonProps) {
  const { colors } = useAppTheme();

  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync().catch((error) => {
        console.log('Haptics not available:', error);
      });
    }
    onPress();
  };

  const getBackgroundColor = () => {
    if (disabled) return colors.border;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.card;
      case 'outline':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.text + '80';
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
      case 'outline':
        return colors.text;
      default:
        return '#FFFFFF';
    }
  };

  const getBorderColor = () => {
    if (variant === 'outline') {
      return disabled ? colors.border : colors.primary;
    }
    return 'transparent';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      {children || (title && (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      ))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});