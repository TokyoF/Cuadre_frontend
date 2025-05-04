import React from "react";
import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export function AuthHeader() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    };
  });

  return (
    <View className="flex items-center">
      <Animated.View
        style={logoStyle}
        className="w-20 h-20 rounded-full bg-white/20 justify-center items-center mb-4"
      >
        <View className="w-15 h-15 rounded-full bg-white/10 justify-center items-center relative">
          <View className="w-7.5 h-7.5 relative" />
        </View>
      </Animated.View>
      <Text className="text-2xl font-bold text-white tracking-wider">
        XENDRE
      </Text>
    </View>
  );
}
