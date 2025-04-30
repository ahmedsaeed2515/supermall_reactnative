import { ReactNode, useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../hooks/useAppTheme';
import HapticTab from './HapticTab';

interface SwipeableRowProps {
  children: ReactNode;
  onDelete: () => void;
  style?: ViewStyle;
}

export default function SwipeableRow({
  children,
  onDelete,
  style,
}: SwipeableRowProps) {
  const { colors } = useAppTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const rowRef = useRef<View>(null);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, { dx, dy }) => {
      return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5;
    },
    onPanResponderMove: (_, { dx }) => {
      const x = Math.min(0, Math.max(-100, dx));
      translateX.setValue(x);
    },
    onPanResponderRelease: (_, { dx }) => {
      if (dx < -50) {
        // Show delete button
        Animated.spring(translateX, {
          toValue: -100,
          useNativeDriver: true,
        }).start();
      } else {
        // Reset position
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleDelete = () => {
    Animated.timing(translateX, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDelete();
    });
  };

  return (
    <View style={[styles.container, style]}>
      {/* Delete button background */}
      <View
        style={[
          styles.deleteBackground,
          { backgroundColor: colors.error },
        ]}
      >
        <HapticTab
          onPress={handleDelete}
          feedbackType="medium"
          style={styles.deleteButton}
        >
          <Ionicons name="trash" size={24} color="white" />
        </HapticTab>
      </View>

      {/* Main content */}
      <Animated.View
        ref={rowRef}
        style={[
          styles.rowContent,
          { transform: [{ translateX }] },
          { backgroundColor: colors.card },
        ]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  deleteBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContent: {
    zIndex: 2,
  },
});