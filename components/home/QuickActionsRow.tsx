// components/home/QuickActionsRow.tsx
// Horizontal row of exactly 5 premium quick action cards using Material rounded icons with soft shadows.

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { useLang } from "@/app/context/LanguageContext";
import { HomeColors } from "@/constants/homeTheme";

type Action = {
  id: string;
  labelEn: string;
  labelHi: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  badge?: string;
  onPress: (router: ReturnType<typeof useRouter>) => void;
};

const ACTIONS: Action[] = [
  {
    id: "offers",
    labelEn: "Offers",
    labelHi: "ऑफ़र्स",
    icon: "tag-outline",
    iconColor: "#0E9D47",
    badge: "NEW",
    onPress: (router) => router.push("/coupons" as any),
  },
  {
    id: "membership",
    labelEn: "Membership",
    labelHi: "मेंबरशिप",
    icon: "crown-outline",
    iconColor: "#0E9D47",
    onPress: (router) => router.push("/memberships" as any),
  },
  {
    id: "technician",
    labelEn: "Technician",
    labelHi: "तकनीशियन",
    icon: "wrench-outline",
    iconColor: "#0E9D47",
    onPress: (router) => router.push("/technician/dashboard" as any),
  },
  {
    id: "refer",
    labelEn: "Refer & Earn",
    labelHi: "रेफर",
    icon: "gift-outline",
    iconColor: "#0E9D47",
    onPress: (router) => router.push("/profile" as any),
  },
  {
    id: "support",
    labelEn: "Support",
    labelHi: "सहायता",
    icon: "headphones",
    iconColor: "#0E9D47",
    onPress: () => Linking.openURL("tel:+911800123456").catch(() => {}),
  },
];

export default function QuickActionsRow() {
  const router = useRouter();
  const { t } = useLang();

  return (
    <View style={styles.container}>
      {ACTIONS.map((action) => (
        <Pressable
          key={action.id}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => action.onPress(router)}
        >
          {action.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{action.badge}</Text>
            </View>
          )}
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name={action.icon} size={22} color={action.iconColor} />
          </View>
          <Text style={styles.label} numberOfLines={1}>
            {t(action.labelEn, action.labelHi)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 20,
    gap: 8,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    position: "relative",
  },
  cardPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#EF4444",
    borderRadius: 999,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    zIndex: 10,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 7.5,
    fontWeight: "900",
  },
  label: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
  },
});
