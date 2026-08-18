import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Search for any service...",
}: Props) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="magnify"
        size={22}
        color="#94A3B8"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    marginHorizontal: 16,
    marginBottom: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#111827",
  },
});
