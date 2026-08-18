// components/home/LabourFreeGrid.tsx
// Horizontal scroll of exactly 6 Labour Free Services with "LABOUR FREE" ribbons/badges.

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useLang } from "@/app/context/LanguageContext";
import { HomeColors } from "@/constants/homeTheme";

export default function LabourFreeGrid() {
  const router = useRouter();
  const { t } = useLang();

  // Exactly 8 items in top grid
  const services = [
    { id: "electrical", name: t("Electrical", "इलेक्ट्रिकल"), icon: "flash", color: "#F59E0B", image: require("@/assets/thumbnails/labour-free/electrical-icon.png"), ribbon: t("REPAIR FREE", "रिपेयर फ्री") },
    { id: "plumbing", name: t("Plumbing", "प्लंबिंग"), icon: "water-pump", color: "#007AFF", image: require("@/assets/thumbnails/labour-free/plumbing-icon.png"), ribbon: t("REPAIR FREE", "रिपेयर फ्री") },
    { id: "appliance", name: t("Home Appliance", "होम अप्लायंस"), icon: "washing-machine", color: "#E91E63", image: require("@/assets/thumbnails/labour-free/appliance-icon.png"), ribbon: t("REPAIR FREE", "रिपेयर फ्री") },
    { id: "carpenter", name: t("Carpenter", "कारपेंटर"), icon: "hammer", color: "#8B5CF6", image: require("@/assets/thumbnails/labour-free/carpenter-icon.png"), ribbon: t("REPAIR FREE", "रिपेयर FREE") },
    { id: "installation", name: t("Installation", "इंस्टॉलेशन"), icon: "wrench", color: "#10B981", image: require("@/assets/thumbnails/labour-free/appliance-icon.png"), ribbon: t("FITTING FREE", "फिटिंग फ्री") },
    { id: "cleaning", name: t("Home Cleaning", "होम क्लीनिंग"), icon: "broom", color: "#00A651", image: require("@/assets/thumbnails/labour-free/cleaning-icon.png"), ribbon: t("DEEP CLEAN", "डीप क्लीन") },
    { id: "pestcontrol", name: t("Pest Control", "पेस्ट कंट्रोल"), icon: "bug", color: "#DC2626", image: require("@/assets/thumbnails/labour-free/cleaning-icon.png"), ribbon: t("SAFE GEL", "सेफ जेल") },
    { id: "inspection", name: t("Inspection", "होम इंस्पेक्शन"), icon: "clipboard-search", color: "#6366F1", image: require("@/assets/thumbnails/labour-free/inspection-icon.png"), ribbon: t("FREE / MONTH", "मुफ्त / माह") },
  ];

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t("🏠 HOME SERVICES", "🏠 HOME SERVICES (सबसे ऊपर)")}</Text>
          <Text style={styles.subtitle}>
            {t("Tap any service to view sub-services", "सब-सर्विस देखने के लिए क्लिक करें")}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.viewAll, pressed && styles.pressed]}
          onPress={() => router.push("/category/labour-free" as any)}
        >
          <Text style={styles.viewAllText}>{t("View All →", "सभी देखें →")}</Text>
        </Pressable>
      </View>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {services.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push(`/category/${item.id}` as any)}
          >
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.imageIcon} resizeMode="contain" />
            </View>
            <Text style={styles.cardName} numberOfLines={2}>
              {item.name}
            </Text>
            {/* Specific Benefit Ribbon */}
            <View style={styles.ribbon}>
              <Text style={styles.ribbonText}>{item.ribbon}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 11,
    color: "#757575",
    marginTop: 2,
    fontWeight: "600",
  },
  viewAll: {
    paddingVertical: 4,
  },
  viewAllText: {
    fontSize: 12.5,
    fontWeight: "800",
    color: HomeColors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 6,
  },
  card: {
    width: 110,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    minHeight: 128,
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  imageIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  cardName: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    height: 32,
    lineHeight: 15,
  },
  ribbon: {
    backgroundColor: "#E8F5E9",
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 6,
  },
  ribbonText: {
    color: "#0E9D47",
    fontSize: 8.5,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
