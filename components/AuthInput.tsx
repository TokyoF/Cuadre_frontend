import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface AuthInputProps extends TextInputProps {
  error?: string;
}

export function AuthInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
  returnKeyType,
  onSubmitEditing,
  error,
  ...rest
}: AuthInputProps) {
  return (
    <View className="mb-4 w-full">
      <TextInput
        className={`bg-white/10 rounded-lg px-4 py-4 text-white text-base border ${
          error ? "border-red-500" : "border-white/20"
        }`}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        selectionColor="#ffffff"
        {...rest}
      />
    </View>
  );
}
