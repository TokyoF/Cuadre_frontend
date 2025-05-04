import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="two-factor" />
        <Stack.Screen name="biometric" />
      </Stack>
    </AuthProvider>
  );
}
