import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  value: string;
  onChange: (text: string) => void;
  placeholder: string; // placeholder opcional
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={22} color="#555" />
      <TextInput
        placeholder={placeholder} // usar placeholder del prop
        style={styles.input}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    elevation: 3,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: "#333" },
});
