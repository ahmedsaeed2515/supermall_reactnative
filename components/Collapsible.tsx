import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../hooks/useAppTheme';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
}

export default function Collapsible({
  title,
  children,
  initiallyExpanded = false,
}: CollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const { colors } = useAppTheme();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.text}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    paddingBottom: 16,
  },
});
