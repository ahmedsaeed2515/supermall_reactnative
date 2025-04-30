import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/useAppTheme';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
}: SearchBarProps) {
  const { colors } = useAppTheme();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchText);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchText, debounceMs, onSearch]);

  const handleClear = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Ionicons 
        name="search" 
        size={20} 
        color={colors.text + '80'} 
        style={styles.searchIcon} 
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.text + '80'}
        value={searchText}
        onChangeText={setSearchText}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Ionicons 
            name="close-circle" 
            size={20} 
            color={colors.text + '80'} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 24,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
});