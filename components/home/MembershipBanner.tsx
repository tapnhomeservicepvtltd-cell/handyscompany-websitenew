// components/home/MembershipBanner.tsx
// High-fidelity premium hero banner for HandysCompany Membership.
// Design style inspired by Google Material 3 and Apple Human Interface.

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { useLang } from "@/app/context/LanguageContext";
import { HomeColors } from "@/constants/homeTheme";

export default function MembershipBanner() {
  const router = useRouter();
  const { t } = useLang();

  // Chips for Labour Free Services (only specific sub-services qualify)
  const chips = [
    { label: t("Electrical Repair", "इलेक्ट्रिकल रिपेयर"), emoji: "⚡" },
    { label: t("Plumbing Repair", "प्लंबिंग रिपेयर"), emoji: "🚰" },
    { label: t("Carpenter Repair", "कारपेंटर रिपेयर"), emoji: "🪚" },
    { label: t("Appliance Repair", "अप्लायंस रिपेयर"), emoji: "🏠" },
    { label: t("Pest Control (Labour Free)", "पेस्ट कंट्रोल (लेबर फ्री)"), emoji: "🛡️" },
    { label: t("Home Cleaning (Labour Free)", "होम क्लीनिंग (लेबर फ्री)"), emoji: "🧹" },
    { label: t("Monthly Inspection", "मंथली इंस्पेक्शन"), emoji: "🔍" },
  ];

  // Trust Badges
  const trustBadges = [
    t("All Repairing Labour Free", "सभी रिपेयरिंग लेबर फ्री"),
    t("Home Clean (Only Chemical Charge)", "सफाई (सिर्फ केमिकल चार्ज)"),
    t("Pest Control (Only Chemical Charge)", "पेस्ट कंट्रोल (सिर्फ केमिकल चार्ज)"),
    t("Free Monthly Inspection", "मुफ्त मंथली इंस्पेक्शन"),
  ];

  return (
    <LinearGradient
      colors={["#0E9D47", "#08763A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Decorative Glow */}
      <View style={styles.glow} />

      {/* Top Banner Details */}
      <View style={styles.topSection}>
        <View style={styles.leftContent}>
          {/* Tagline / Popular Badge Row */}
          <View style={styles.badgeRow}>
            <Text style={styles.subtext}>HandysCompany</Text>
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>{t("POPULAR", "लोकप्रिय")}</Text>
            </View>
          </View>

          {/* Banner Title */}
          <Text style={styles.title}>{t("Membership", "मेंबरशिप")}</Text>

          {/* Pricing */}
          <View style={styles.priceRow}>
            <Text style={styles.priceSymbol}>₹</Text>
            <Text style={styles.priceText}>699</Text>
            <Text style={styles.validityPill}>{t("Validity: 6 Months", "वैधता: 6 महीने")}</Text>
          </View>
        </View>

        {/* Technician Image */}
        <View style={styles.rightContent}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=260&q=80",
            }}
            style={styles.technicianImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Labour Free Subtitle */}
      <Text style={styles.labourTitle}>
        {t("Repairing Labour FREE + Home Cleaning + Monthly Inspection", "रिपेयरिंग लेबर फ्री + होम क्लीनिंग + मंथली इंस्पेक्शन")}
      </Text>

      {/* Service Chips */}
      <View style={styles.chipsContainer}>
        {chips.map((chip, idx) => (
          <View key={idx} style={styles.chip}>
            <Text style={styles.chipText}>
              {chip.emoji} {chip.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Bullet Badges Grid */}
      <View style={styles.bulletsContainer}>
        {trustBadges.map((badge, idx) => (
          <View key={idx} style={styles.bulletItem}>
            <Ionicons name="checkmark-circle" size={14} color="#FFD54F" />
            <Text style={styles.bulletText}>{badge}</Text>
          </View>
        ))}
      </View>

      {/* CTA Button */}
      <Pressable
        style={({ pressed }) => [
          styles.ctaButton,
          pressed && styles.ctaButtonPressed,
        ]}
        onPress={() => router.push("/memberships" as any)}
      >
        <Text style={styles.ctaText}>
          {t("JOIN MEMBERSHIP →", "मेंबरशिप ज्वाइन करें →")}
        </Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 24,
    padding: 20,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#08763A",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  glow: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 110,
  },
  leftContent: {
    flex: 1.1,
  },
  rightContent: {
    flex: 0.9,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "relative",
  },
  technicianImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  subtext: {
    color: "#E8F5E9",
    fontSize: 12,
    fontWeight: "600",
  },
  popularBadge: {
    backgroundColor: "#FFD54F",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  popularText: {
    color: "#08763A",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  priceSymbol: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
  },
  validityPill: {
    marginLeft: 8,
    color: "#FFD54F",
    fontSize: 12,
    fontWeight: "700",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  labourTitle: {
    color: "#E8F5E9",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 10,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 14,
  },
  chip: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chipText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  bulletsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
  },
  bulletItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  bulletText: {
    color: "#E8F5E9",
    fontSize: 11,
    fontWeight: "600",
  },
  ctaButton: {
    backgroundColor: "#FFD54F",
    borderRadius: 16,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  ctaButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    color: "#08763A",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});
