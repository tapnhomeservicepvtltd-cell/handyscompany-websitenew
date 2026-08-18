// components/home/BottomNavBar.tsx
// Fixed bottom navigation using SVG tab icons with multi-language support: Home, Bookings, Book Now, Wallet, Profile.

import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { useLang } from "@/app/context/LanguageContext";
import {
  SvgBookingsTabIcon,
  SvgHomeTabIcon,
  SvgProfileTabIcon,
  SvgWalletTabIcon,
} from "@/components/icons/SvgIcons";
import { HomeColors, HomeShadow } from "@/constants/homeTheme";

export default function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { t } = useLang();

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const isActive = (route: string) =>
    route === "/" ? pathname === "/" || pathname === "/(tabs)" : pathname?.startsWith(route);

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(insets.bottom, Platform.OS === "web" ? 10 : 8) },
      ]}
    >
      {/* Home */}
      <Pressable style={styles.item} onPress={() => router.push("/" as any)}>
        <SvgHomeTabIcon
          size={24}
          color={isActive("/") ? HomeColors.primary : HomeColors.textFaint}
          focused={isActive("/")}
        />
        <Text style={[styles.label, isActive("/") && styles.labelActive]}>
          {t("Home", "होम")}
        </Text>
      </Pressable>

      {/* Bookings */}
      <Pressable style={styles.item} onPress={() => router.push("/bookings" as any)}>
        <SvgBookingsTabIcon
          size={24}
          color={isActive("/bookings") ? HomeColors.primary : HomeColors.textFaint}
          focused={isActive("/bookings")}
        />
        <Text style={[styles.label, isActive("/bookings") && styles.labelActive]}>
          {t("Bookings", "बुकिंग्स")}
        </Text>
      </Pressable>

      {/* Raised center "Book Now" button */}
      <View style={styles.centerSlot}>
        <Pressable
          onPressIn={() => {
            scale.value = withSpring(0.9, { damping: 10, stiffness: 300 });
          }}
          onPressOut={() => {
            scale.value = withSpring(1, { damping: 10, stiffness: 300 });
          }}
          onPress={() => router.push("/explore" as any)}
        >
          <Animated.View style={[styles.centerBtn, animatedStyle]}>
            <SvgBookingsTabIcon size={24} color="#FFFFFF" focused />
          </Animated.View>
        </Pressable>
        <Text style={styles.centerLabel}>
          {t("Book Now", "बुक करें")}
        </Text>
      </View>

      {/* Wallet */}
      <Pressable style={styles.item} onPress={() => router.push("/wallet" as any)}>
        <SvgWalletTabIcon
          size={24}
          color={isActive("/wallet") ? HomeColors.primary : HomeColors.textFaint}
          focused={isActive("/wallet")}
        />
        <Text style={[styles.label, isActive("/wallet") && styles.labelActive]}>
          {t("Wallet", "वॉलेट")}
        </Text>
      </Pressable>

      {/* Profile */}
      <Pressable style={styles.item} onPress={() => router.push("/profile" as any)}>
        <SvgProfileTabIcon
          size={24}
          color={isActive("/profile") ? HomeColors.primary : HomeColors.textFaint}
          focused={isActive("/profile")}
        />
        <Text style={[styles.label, isActive("/profile") && styles.labelActive]}>
          {t("Profile", "प्रोफ़ाइल")}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: HomeColors.surface,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: HomeColors.border,
    ...HomeShadow.floating,
  },
  item: { flex: 1, alignItems: "center", gap: 3, paddingBottom: 2 },
  label: { fontSize: 10.5, fontWeight: "700", color: HomeColors.textFaint },
  labelActive: { color: HomeColors.primary, fontWeight: "800" },
  centerSlot: {
    flex: 1,
    alignItems: "center",
    marginTop: -30,
  },
  centerBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: HomeColors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: HomeColors.surface,
    shadowColor: HomeColors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  centerLabel: {
    marginTop: 4,
    fontSize: 10.5,
    fontWeight: "800",
    color: HomeColors.primary,
  },
});
