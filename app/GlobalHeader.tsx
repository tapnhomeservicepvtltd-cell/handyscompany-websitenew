import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, StatusBar as RNStatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLang } from "./context/LanguageContext";

export default function GlobalHeader() {
  const { lang, setLang, t } = useLang();

  // 🌐 फिक्स: router.setParams को हटा दिया है। 
  // Expo Router में सेट-पैराम्स करंट स्क्रीन के यूआरएल को फ्रीज कर देता है, जिससे ग्लोबल स्टेट री-रेंडर रुक जाता था।
  const changeLanguage = (newLang: "en" | "hi") => {
    setLang(newLang); 
  };

  return (
    // ⚡ बिल्कुल छोटा और स्लिम हेडर कंटेनर
    <View style={styles.header}>
      <View style={styles.headerTopRow}>
        
        {/* लेफ्ट side: होम बटन */}
        <TouchableOpacity 
          onPress={() => router.replace("/(tabs)")} 
          activeOpacity={0.7}
          style={styles.homeBtn}
        >
          <Ionicons name="home" size={16} color="#00A651" />
        </TouchableOpacity>

        {/* सेंटर: लोगो और उसके ठीक नीचे सटकर टैगलाइन */}
        <View style={styles.logoWrapper}>
          <Text style={styles.logo}>HandysCompany</Text>
          <Text style={styles.sloganText}>
            {t("India’s Trusted Free Home Services Provider", "भारत की विश्वसनीय फ्री होम सर्विसेज प्रोवाइडर")}
          </Text>
        </View>
        
        {/* राइट साइड: स्टार्टअप बैज और लैंग्वेज स्विचर */}
        <View style={styles.rightActions}>
          <View style={styles.startupBadge}>
            <Text style={styles.startupBadgeText}>
              {t("🇮🇳 Startup", "🇮🇳 स्टार्टअप")}
            </Text>
          </View>

          <View style={styles.langContainer}>
            <TouchableOpacity 
              style={[styles.langBtn, lang === "en" && styles.langBtnActive]} 
              onPress={() => changeLanguage("en")}
            >
              <Text style={[styles.langText, lang === "en" && styles.langTextActive]}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.langBtn, lang === "hi" && styles.langBtnActive]} 
              onPress={() => changeLanguage("hi")}
            >
              <Text style={[styles.langText, lang === "hi" && styles.langTextActive]}>हिं</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { 
    paddingTop: Platform.OS === "android" ? (RNStatusBar.currentHeight ? RNStatusBar.currentHeight + 4 : 10) : 6, 
    paddingBottom: 4, 
    backgroundColor: "#F7F7FB", 
    paddingHorizontal: 12, 
    borderBottomWidth: 1, 
    borderColor: "#E1F5E6",
  },
  headerTopRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    position: "relative", 
    height: 28 
  },
  homeBtn: { 
    padding: 2, 
    justifyContent: "center", 
    alignItems: "center", 
    zIndex: 10 
  },
  logoWrapper: { 
    position: "absolute", 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  logo: { 
    fontSize: 16, 
    fontWeight: "900", 
    color: "#00A651",
    lineHeight: 16
  },
  sloganText: { 
    fontSize: 8, 
    fontWeight: "700", 
    color: "#556B5D", 
    marginTop: -2,
    lineHeight: 9
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    zIndex: 10,
    marginLeft: "auto"
  },
  langContainer: { 
    flexDirection: "row", 
    backgroundColor: "#E6F6ED", 
    borderRadius: 6, 
    padding: 1, 
    borderWidth: 1, 
    borderColor: "#B3E6C9", 
    alignItems: "center"
  },
  langBtn: { 
    paddingHorizontal: 6, 
    paddingVertical: 1.5, 
    borderRadius: 5, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  langBtnActive: { 
    backgroundColor: "#00A651" 
  },
  langText: { 
    fontSize: 9, 
    fontWeight: "800", 
    color: "#00A651" 
  },
  langTextActive: { 
    color: "#FFFFFF" 
  },
  startupBadge: { 
    backgroundColor: "#FFFFFF", 
    borderRadius: 6, 
    paddingHorizontal: 4, 
    paddingVertical: 1.5, 
    borderWidth: 1, 
    borderColor: "#E1F5E6"
  },
  startupBadgeText: { 
    fontSize: 8, 
    fontWeight: "700", 
    color: "#556B5D" 
  },
});