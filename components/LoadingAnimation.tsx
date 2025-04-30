import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { ThemedView } from './ThemedView';

export function LoadingAnimation() {
  return (
    <ThemedView style={styles.container}>
      <LottieView
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
        style={styles.animation}
      />
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
    width: 100,
    height: 100,
  },
});