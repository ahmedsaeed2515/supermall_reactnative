// import { ReactNode, useCallback } from 'react';
// import {
//   View,
//   ScrollView,
//   Animated,
//   StyleSheet,
//   ViewStyle,
//   RefreshControl,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
// } from 'react-native';

// interface ParallaxScrollViewProps {
//   children: ReactNode;
//   headerComponent?: ReactNode;
//   headerHeight?: number;
//   onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
//   onRefresh?: () => Promise<void>;
//   isRefreshing?: boolean;
//   style?: ViewStyle;
//   contentContainerStyle?: ViewStyle;
// }

// export default function ParallaxScrollView({
//   children,
//   headerComponent,
//   headerHeight = 200,
//   onScroll,
//   onRefresh,
//   isRefreshing = false,
//   style,
//   contentContainerStyle,
// }: ParallaxScrollViewProps) {
//   const scrollY = new Animated.Value(0);

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//     {
//       useNativeDriver: true,
//       listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//         onScroll?.(event);
//       },
//     }
//   );

//   const headerTranslateY = scrollY.interpolate({
//     inputRange: [0, headerHeight],
//     outputRange: [0, -headerHeight],
//     extrapolate: 'clamp',
//   });

//   const imageScale = scrollY.interpolate({
//     inputRange: [-headerHeight, 0],
//     outputRange: [2, 1],
//     extrapolateRight: 'clamp',
//   });

//   return (
//     <View style={[styles.container, style]}>
//       {headerComponent && (
//         <Animated.View
//           style={[
//             styles.header,
//             {
//               height: headerHeight,
//               transform: [
//                 { translateY: headerTranslateY },
//                 { scale: imageScale },
//               ],
//             },
//           ]}
//         >
//           {headerComponent}
//         </Animated.View>
//       )}
//       <ScrollView
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         contentContainerStyle={[
//           styles.content,
//           { paddingTop: headerComponent ? headerHeight : 0 },
//           contentContainerStyle,
//         ]}
//         refreshControl={
//           onRefresh ? (
//             <RefreshControl
//               refreshing={isRefreshing}
//               onRefresh={onRefresh}
//               progressViewOffset={headerHeight}
//             />
//           ) : undefined
//         }
//       >
//         {children}
//       </ScrollView>
//     </View>
//   );
// }


import { ReactNode } from 'react';
import {
  View,
  ScrollView,
  Animated,
  StyleSheet,
  ViewStyle,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

interface ParallaxScrollViewProps {
  children: ReactNode;
  headerComponent?: ReactNode;
  headerHeight?: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export default function ParallaxScrollView({
  children,
  headerComponent,
  headerHeight = 200,
  onScroll,
  onRefresh,
  isRefreshing = false,
  style,
  contentContainerStyle,
}: ParallaxScrollViewProps) {
  const scrollY = new Animated.Value(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: onScroll,
    }
  );

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-headerHeight, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  });

  return (
    <View style={[styles.container, style]}>
      {headerComponent && (
        <Animated.View
          style={[
            styles.header,
            {
              height: headerHeight,
              transform: [
                { translateY: headerTranslateY },
                { scale: imageScale },
              ],
            },
          ]}
        >
          {headerComponent}
        </Animated.View>
      )}
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.content,
          { paddingTop: headerComponent ? headerHeight : 0 },
          contentContainerStyle,
        ]}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              progressViewOffset={headerHeight}
            />
          ) : undefined
        }
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  content: {
    flexGrow: 1,
  },
});