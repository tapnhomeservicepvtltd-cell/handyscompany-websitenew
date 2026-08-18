// components/NeedHelpSection.tsx
// Three premium help actions: Call, WhatsApp and Live Chat in rounded buttons.

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking, Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";

import { useLang } from "@/app/context/LanguageContext";
import { HomeColors } from "@/constants/homeTheme";

export default function NeedHelpSection() {
  const { t } = useLang();

  const handleCall = () => {
    Linking.openURL("tel:+911800123456").catch(() => {});
  };

  const handleWhatsApp = () => {
    Linking.openURL("whatsapp://send?phone=+911800123456&text=Hello!").catch(() => {
      Linking.openURL("https://wa.me/911800123456").catch(() => {});
    });
  };

  const handleLiveChat = () => {
    Linking.openURL("mailto:support@handyscompany.com").catch(() => {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t("Need Help?", "सहायता चाहिए?")}</Text>

      <View style={styles.row}>
        {/* Call Button */}
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnOutlined, pressed && styles.pressed] as ViewStyle[]}
          onPress={handleCall}
        >
          <Ionicons name="call-outline" size={16} color={HomeColors.primary} />
          <Text style={[styles.btnText, styles.textOutlined] as TextStyle[]}>{t("Call", "कॉल करें")}</Text>
        </Pressable>

        {/* WhatsApp Button */}
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnFilled, pressed && styles.pressed] as ViewStyle[]}
          onPress={handleWhatsApp}
        >
          <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
          <Text style={[styles.btnText, styles.textFilled] as TextStyle[]}>{t("WhatsApp", "व्हाट्सएप")}</Text>
        </Pressable>

        {/* Live Chat Button */}
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnOutlined, pressed && styles.pressed] as ViewStyle[]}
          onPress={handleLiveChat}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={16} color={HomeColors.primary} />
          <Text style={[styles.btnText, styles.textOutlined] as TextStyle[]}>{t("Live Chat", "चैट करें")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 32,
  },
  heading: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  btn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  } as ViewStyle,
  btnOutlined: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: HomeColors.primary,
  } as ViewStyle,
  btnFilled: {
    backgroundColor: HomeColors.primary,
    shadowColor: "#0E9D47",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  } as ViewStyle,
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  } as ViewStyle,
  btnText: {
    fontSize: 12.5,
    fontWeight: "800",
  } as TextStyle,
  textOutlined: {
    color: HomeColors.primary,
  } as TextStyle,
  textFilled: {
    color: "#FFFFFF",
  } as TextStyle,
});
