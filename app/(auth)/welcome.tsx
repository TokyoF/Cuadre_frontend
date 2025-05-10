// src/app/welcome.tsx
import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido a la aplicación! 🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  text: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
