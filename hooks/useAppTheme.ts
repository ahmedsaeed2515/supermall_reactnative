import { useColorScheme } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  error: string;
  success: string;
}

export function useAppTheme() {
  const systemColorScheme = useColorScheme();
  const { theme } = useTheme();
  
  const effectiveTheme = theme === 'system' ? systemColorScheme : theme;
  const isDark = effectiveTheme === 'dark';

  const colors: ThemeColors = {
    primary: '#007AFF',
    background: isDark ? '#000000' : '#FFFFFF',
    card: isDark ? '#1C1C1E' : '#F2F2F7',
    text: isDark ? '#FFFFFF' : '#000000',
    border: isDark ? '#38383A' : '#C6C6C8',
    error: '#FF3B30',
    success: '#34C759',
  };

  return { colors, isDark };
}