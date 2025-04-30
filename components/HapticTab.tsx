import { TouchableOpacity, StyleSheet, ViewStyle, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

interface HapticTabProps {
  onPress: () => void;
  children: React.ReactNode;
  feedbackType?: 'light' | 'medium' | 'heavy';
  style?: ViewStyle;
  disabled?: boolean;
}

export default function HapticTab({
  onPress,
  children,
  feedbackType = 'light',
  style,
  disabled = false,
}: HapticTabProps) {
  const handlePress = async () => {
    if (disabled) return;

    // Only use haptics on native platforms
    if (Platform.OS !== 'web') {
      try {
        switch (feedbackType) {
          case 'light':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
          case 'medium':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            break;
          case 'heavy':
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            break;
        }
      } catch (error) {
        // Silently handle haptics errors
        console.log('Haptics not available:', error);
      }
    }

    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, style]}
      activeOpacity={0.7}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
