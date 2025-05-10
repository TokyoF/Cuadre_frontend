import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  FadeInUp,
  runOnJS,
} from "react-native-reanimated";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { useBiometrics } from "@/hooks/useBiometrics";

export default function Biometric() {
  const router = useRouter();
  const { authenticate, isBiometricsAvailable } = useBiometrics();
  const [scanState, setScanState] = useState<
    "initial" | "scanning" | "success" | "error"
  >("initial");
  const [statusMessage, setStatusMessage] = useState(
    "Place your finger on the scanner",
  );

  // Animation values
  const opacity = useSharedValue(0.4);
  const scale = useSharedValue(1);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    if (scanState === "scanning") {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1000 }),
          withTiming(0.4, { duration: 1000 }),
        ),
        -1,
        true,
      );

      progressWidth.value = withTiming(
        1,
        {
          duration: 2500,
          easing: Easing.linear,
        },
        () => {
          runOnJS(handleAuthentication)();
        },
      );
    } else if (scanState === "success") {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSequence(
        withTiming(1.1, { duration: 150 }),
        withTiming(1, { duration: 150 }),
      );
    } else if (scanState === "error") {
      opacity.value = withTiming(0.4, { duration: 300 });
      scale.value = withSequence(
        withTiming(1.1, { duration: 100 }),
        withTiming(0.9, { duration: 100 }),
        withTiming(1.1, { duration: 100 }),
        withTiming(1, { duration: 100 }),
      );
    } else {
      opacity.value = withTiming(0.4, { duration: 300 });
      scale.value = withTiming(1, { duration: 300 });
      progressWidth.value = withTiming(0, { duration: 300 });
    }
  }, [scanState]);

  const fingerprintStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value * 100}%`,
    };
  });

  const startScanning = () => {
    setScanState("scanning");
    setStatusMessage("Scanning...");
  };

  const handleAuthentication = async () => {
    if (!isBiometricsAvailable) {
      setScanState("error");
      setStatusMessage("Biometrics not available on this device");
      return;
    }

    try {
      const result = await authenticate();

      if (result.success) {
        setScanState("success");
        setStatusMessage("Authentication successful");

        // Navigate to the main app after a short delay
        setTimeout(() => {
          router.push("/(tabs)");
        }, 1500);
      } else {
        setScanState("error");
        setStatusMessage(result.error || "Authentication failed");

        // Reset after a delay
        setTimeout(() => {
          setScanState("initial");
          setStatusMessage("Place your finger on the scanner");
        }, 2000);
      }
    } catch (error) {
      setScanState("error");
      setStatusMessage("Authentication error");

      // Reset after a delay
      setTimeout(() => {
        setScanState("initial");
        setStatusMessage("Place your finger on the scanner");
      }, 2000);
    }
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
          <Text style={styles.title}>Biometric Login</Text>
        </Animated.View>

        <View style={styles.content}>
          <Animated.View
            entering={FadeInUp.duration(800).delay(400)}
            style={styles.scannerContainer}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={startScanning}
              disabled={scanState !== "initial"}
            >
              <Animated.View
                style={[styles.fingerprintOutline, fingerprintStyle]}
              >
                <View style={styles.fingerprintPattern}>
                  {/* SVG fingerprint pattern would normally go here */}
                  {/* For simplicity, using a placeholder view */}
                  <View style={styles.fingerprintLine1} />
                  <View style={styles.fingerprintLine2} />
                  <View style={styles.fingerprintLine3} />
                  <View style={styles.fingerprintCircle} />
                </View>
              </Animated.View>
            </TouchableOpacity>

            <Animated.View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, progressStyle]} />
            </Animated.View>
          </Animated.View>

          <Animated.Text
            entering={FadeInUp.duration(800).delay(600)}
            style={[
              styles.statusText,
              scanState === "success" && styles.successText,
              scanState === "error" && styles.errorText,
            ]}
          >
            {statusMessage}
          </Animated.Text>

          <Animated.Text
            entering={FadeInUp.duration(800).delay(800)}
            style={styles.infoText}
          >
            {scanState === "initial"
              ? "Tap on the fingerprint sensor to authenticate"
              : ""}
          </Animated.Text>
        </View>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scannerContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  fingerprintOutline: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 24,
  },
  fingerprintPattern: {
    width: "80%",
    height: "80%",
    position: "relative",
  },
  fingerprintLine1: {
    position: "absolute",
    width: "70%",
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    top: "40%",
    left: "15%",
    borderRadius: 4,
  },
  fingerprintLine2: {
    position: "absolute",
    width: "50%",
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    top: "55%",
    left: "25%",
    borderRadius: 4,
  },
  fingerprintLine3: {
    position: "absolute",
    width: "60%",
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    top: "70%",
    left: "20%",
    borderRadius: 4,
  },
  fingerprintCircle: {
    position: "absolute",
    width: "30%",
    height: "30%",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    top: "20%",
    left: "35%",
  },
  progressBarContainer: {
    width: "80%",
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#a34fde",
    width: 0,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
  },
  successText: {
    color: "#4cd964",
  },
  errorText: {
    color: "#ff3b30",
  },
  infoText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
});
