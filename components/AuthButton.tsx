import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export function AuthButton({
  title,
  onPress,
  isLoading = false,
  isDisabled = false,
}: AuthButtonProps) {
  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };

  const onPressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View className={`w-full my-2 ${animatedStyle}`}>
      <TouchableOpacity
        className={`bg-purple-600 rounded-lg py-4 items-center justify-center ${isDisabled ? "bg-purple-600/50" : ""}`}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={isLoading || isDisabled}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-white text-lg font-bold tracking-wider">
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
