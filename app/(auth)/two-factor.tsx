import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft } from "lucide-react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { AuthButton } from "@/components/auth/AuthButton";

export default function TwoFactor() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      // Handle paste event
      const pastedCode = text.split("").slice(0, 6);
      const newCode = [...code];

      pastedCode.forEach((digit, idx) => {
        if (idx + index < 6) {
          newCode[idx + index] = digit;
        }
      });

      setCode(newCode);

      // Focus the next input that needs to be filled
      const nextEmptyIndex = newCode.findIndex((c) => c === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else {
      // Handle single digit input
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text !== "" && index < 5) {
        // Move to next input
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && code[index] === "") {
      // Move to previous input on backspace if current input is empty
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      setError("Please enter the complete verification code");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demonstration purposes, we'll just check if code is 123456
      if (verificationCode === "123456") {
        // Navigate to the authenticated area
        router.push("/(tabs)");
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = () => {
    // Reset code input
    setCode(["", "", "", "", "", ""]);
    setError("");
    // Reset timer
    setTimer(30);
    // Simulate sending a new code
    // In a real app, this would make an API call
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Animated.View
          entering={FadeInUp.duration(800).delay(200)}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Two-Factor Authentication</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(800).delay(400)}
          style={styles.content}
        >
          <Text style={styles.description}>
            Enter the 6-digit verification code that was sent to your email
          </Text>

          {error ? (
            <Animated.Text
              entering={FadeIn.duration(400)}
              style={styles.errorText}
            >
              {error}
            </Animated.Text>
          ) : null}

          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.codeInput}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                maxLength={6}
                keyboardType="number-pad"
                selectionColor="#ffffff"
              />
            ))}
          </View>

          <AuthButton
            title="VERIFY"
            onPress={handleVerify}
            isLoading={isLoading}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code?</Text>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend in {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={resendCode}>
                <Text style={styles.resendButton}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    position: "relative",
    marginTop: 60,
    marginBottom: 40,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 40,
  },
  content: {
    alignItems: "center",
    marginTop: 24,
  },
  description: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  errorText: {
    color: "#ff6b6b",
    marginBottom: 16,
    fontSize: 14,
    textAlign: "center",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  resendContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  resendText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    marginBottom: 8,
  },
  timerText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 14,
  },
  resendButton: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
});
