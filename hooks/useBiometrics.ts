import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Platform } from "react-native";

interface BiometricResult {
  success: boolean;
  error?: string;
}

export function useBiometrics() {
  const [isBiometricsAvailable, setIsBiometricsAvailable] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      if (Platform.OS === "web") {
        // Biometrics aren't available on web
        setIsBiometricsAvailable(false);
        return;
      }

      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      setIsBiometricsAvailable(compatible && enrolled);
    } catch (error) {
      console.error("Error checking biometric availability", error);
      setIsBiometricsAvailable(false);
    }
  };

  const authenticate = async (): Promise<BiometricResult> => {
    if (Platform.OS === "web") {
      // Simulate success on web for demo purposes
      return { success: true };
    }

    try {
      // Check if device has biometric hardware
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        return {
          success: false,
          error: "This device does not support biometric authentication",
        };
      }

      // Check if user has enabled biometrics
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        return {
          success: false,
          error:
            "No biometrics found. Please set up fingerprint or face recognition on your device",
        };
      }

      // Authenticate with biometrics
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to continue",
        fallbackLabel: "Use passcode",
      });

      return {
        success: result.success,
        error: result.success ? undefined : "Authentication failed",
      };
    } catch (error) {
      console.error("Biometric authentication error", error);
      return {
        success: false,
        error: "An unexpected error occurred during authentication",
      };
    }
  };

  return {
    isBiometricsAvailable,
    authenticate,
  };
}
