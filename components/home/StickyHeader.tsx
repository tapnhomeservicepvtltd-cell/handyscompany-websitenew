// components/home/StickyHeader.tsx
// Premium top app bar for the Home Screen with a more elevated, polished look.

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLang } from "@/app/context/LanguageContext";
import { SvgNotificationBellIcon } from "@/components/icons/SvgIcons";
import { HomeColors } from "@/constants/homeTheme";

type Props = {
  notificationCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
};

export default function StickyHeader({
  notificationCount = 3,
  isLoggedIn = false,
  userName,
}: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  return (
    <LinearGradient
      colors={["#F4FFF8", "#ECF9F1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.wrapper,
        { paddingTop: Platform.OS === "web" ? 12 : insets.top + 8 },
      ]}
    >
      <Pressable
        hitSlop={10}
        onPress={() => setMenuOpen(true)}
        style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
      >
        <Ionicons name="menu" size={24} color={HomeColors.primaryDeep} />
      </Pressable>

      <Pressable style={styles.logoRow} onPress={() => router.push("/" as any)} hitSlop={6}>
        <View style={styles.logoMarkWrap}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logoMark}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.logoText}>
          Handys<Text style={styles.logoTextAccent}>Company</Text>
        </Text>
      </Pressable>

      <View style={styles.rightActions}>
        <View style={styles.langContainer}>
          <TouchableOpacity
            style={[styles.langBtn, lang === "en" && styles.langBtnActive]}
            onPress={() => setLang("en")}
            activeOpacity={0.8}
          >
            <Text style={[styles.langText, lang === "en" && styles.langTextActive]}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langBtn, lang === "hi" && styles.langBtnActive]}
            onPress={() => setLang("hi")}
            activeOpacity={0.8}
          >
            <Text style={[styles.langText, lang === "hi" && styles.langTextActive]}>हिं</Text>
          </TouchableOpacity>
        </View>

        <Pressable
          hitSlop={10}
          onPress={() => router.push("/notifications" as any)}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <SvgNotificationBellIcon size={20} color={HomeColors.primaryDeep} />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount > 9 ? "9+" : notificationCount}</Text>
            </View>
          )}
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.authBtn, pressed && styles.pressed]}
          onPress={() => router.push((isLoggedIn ? "/profile" : "/login") as any)}
        >
          <MaterialCommunityIcons
            name={isLoggedIn ? "account-circle" : "account-outline"}
            size={16}
            color={HomeColors.primary}
          />
          <Text style={styles.authBtnText} numberOfLines={1}>
            {isLoggedIn ? userName ?? t("Profile", "प्रोफ़ाइल") : t("Login", "लॉगइन")}
          </Text>
        </Pressable>
      </View>

      <Modal
        visible={menuOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.modalScrim} onPress={() => setMenuOpen(false)}>
          <Pressable
            style={[styles.menuPanel, { paddingTop: insets.top + 20 }]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>{t("Quick Navigation", "त्वरित नेविगेशन")}</Text>
            </View>

            {[
              { label: t("Home", "होम"), icon: "home-variant", route: "/" },
              { label: t("My Bookings", "मेरी बुकिंग्स"), icon: "calendar-check", route: "/bookings" },
              { label: t("Wallet", "वॉलेट"), icon: "wallet-outline", route: "/wallet" },
              { label: t("Membership", "मेम्बरशिप"), icon: "crown-outline", route: "/memberships" },
              { label: t("Coupons & Offers", "कूपन्स और ऑफर्स"), icon: "ticket-percent-outline", route: "/coupons" },
              { label: t("Profile", "प्रोफ़ाइल"), icon: "account-outline", route: "/profile" },
            ].map((item) => (
              <Pressable
                key={item.route}
                style={({ pressed }) => [styles.menuRow, pressed && styles.pressed]}
                onPress={() => {
                  setMenuOpen(false);
                  router.push(item.route as any);
                }}
              >
                <MaterialCommunityIcons name={item.icon as any} size={22} color={HomeColors.primary} />
                <Text style={styles.menuRowText}>{item.label}</Text>
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 50, 26, 0.08)",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
  },
  logoMarkWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HomeColors.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: HomeColors.primary,
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  logoMark: {
    width: 26,
    height: 26,
  },
  logoText: {
    fontSize: 17,
    fontWeight: "900",
    color: HomeColors.primaryDeep,
    marginLeft: 8,
  },
  logoTextAccent: {
    color: HomeColors.primary,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: HomeColors.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: HomeColors.danger,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 8.5,
    fontWeight: "900",
  },
  authBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: HomeColors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  authBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: HomeColors.primaryDeep,
  },
  langContainer: {
    flexDirection: "row",
    backgroundColor: HomeColors.surface,
    borderRadius: 999,
    padding: 2,
    borderWidth: 1,
    borderColor: "#D9F5E3",
    alignItems: "center",
  },
  langBtn: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    justifyContent: "center",
  },
  langBtnActive: {
    backgroundColor: HomeColors.primary,
  },
  langText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: HomeColors.textMuted,
  },
  langTextActive: {
    color: "#FFFFFF",
  },
  modalScrim: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.3)",
    justifyContent: "flex-end",
  },
  menuPanel: {
    backgroundColor: HomeColors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  menuHeader: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: HomeColors.border,
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: HomeColors.primaryDeep,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },
  menuRowText: {
    fontSize: 15,
    fontWeight: "700",
    color: HomeColors.text,
  },
});
