import React from "react";
import { Tabs } from "expo-router";
import { Chrome as Home, User } from "lucide-react-native";
import { useAuth } from "@/hooks/useAuth";

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  // If not authenticated, we shouldn't render the tabs at all
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#a34fde",
        tabBarInactiveTintColor: "#888888",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.1)",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: "#a34fde",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: "Welcome",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          headerTitle: "My Profile",
        }}
      />
    </Tabs>
  );
}
