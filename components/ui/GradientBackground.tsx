import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <View className="flex-1 relative">
      <LinearGradient
        colors={["#a34fde", "#6a1b9a", "#280a33"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      {children}
    </View>
  );
}
