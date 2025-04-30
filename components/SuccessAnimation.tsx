import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface Props {
  onAnimationFinish?: () => void;
  message?: string;
}

export function SuccessAnimation({ onAnimationFinish, message }: Props) {
  return (
    <ThemedView style={styles.container}>
      <LottieView
        source={require('../assets/animations/success.json')}
        autoPlay
        loop={false}
        style={styles.animation}
        onAnimationFinish={onAnimationFinish}
      />
      {message && <ThemedText style={styles.message}>{message}</ThemedText>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});