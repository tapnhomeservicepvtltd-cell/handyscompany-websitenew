// components/home/HomeSearchBar.tsx
// High-fidelity premium search bar matching Google Material 3 design guidelines.

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";

import { useLang } from "@/app/context/LanguageContext";
import { HomeColors } from "@/constants/homeTheme";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onVoicePress?: () => void;
  placeholder?: string;
};

export default function HomeSearchBar({
  value,
  onChangeText,
  onSubmit,
  onVoicePress,
  placeholder,
}: Props) {
  const { t } = useLang();
  const defaultPlaceholder = t(
    "Search AC Repair, Electrician, Plumber...",
    "एसी रिपेयर, इलेक्ट्रिशियन, प्लंबर खोजें..."
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchInner}>
        <Ionicons name="search-outline" size={20} color="#757575" style={styles.searchIcon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          placeholder={placeholder || defaultPlaceholder}
          placeholderTextColor="#9E9E9E"
          style={styles.input}
          numberOfLines={1}
        />
        {/* Right Voice Search Icon inside a green circular button */}
        <Pressable
          style={({ pressed }) => [styles.voiceBtn, pressed && styles.voiceBtnPressed]}
          onPress={onVoicePress}
          hitSlop={6}
        >
          <Ionicons name="mic" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
  },
  searchInner: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingLeft: 16,
    paddingRight: 6,
    borderRadius: 28,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "600",
  },
  voiceBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: HomeColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  voiceBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
});
