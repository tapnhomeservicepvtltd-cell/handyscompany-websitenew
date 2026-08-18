// components/home/LocationBar.tsx
// Compact "Current location" row using SVG pin icon.

import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { SvgLocationPinIcon } from "@/components/icons/SvgIcons";
import { HomeColors } from "@/constants/homeTheme";

type Props = {
  city?: string;
  onPress?: () => void;
};

export default function LocationBar({ city = "Gaya, Bihar", onPress }: Props) {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      onPress={onPress ?? (() => router.push("/booking/location" as any))}
    >
      <View style={styles.pinWrap}>
        <SvgLocationPinIcon size={18} color={HomeColors.primary} />
      </View>
      <Text style={styles.city} numberOfLines={1}>
        {city}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
    alignSelf: "flex-start",
  },
  pressed: { opacity: 0.6 },
  pinWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: HomeColors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  city: {
    fontSize: 15,
    fontWeight: "800",
    color: HomeColors.primaryDeep,
  },
});
