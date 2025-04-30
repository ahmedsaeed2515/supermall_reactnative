import { Colors } from '@/constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import { useColorScheme } from 'react-native';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const systemColorScheme = useColorScheme();
  const { theme } = useTheme();
  
  const effectiveTheme = theme === 'system' ? systemColorScheme ?? 'light' : theme;
  const colorFromProps = props[effectiveTheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[effectiveTheme][colorName];
  }
}
