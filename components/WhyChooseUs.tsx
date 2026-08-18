// components/WhyChooseUs.tsx
// Grid-based 2x2 trust section for HandysCompany with premium icons and clean typography.

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useLang } from "@/app/context/LanguageContext";

export default function WhyChooseUs() {
  const { t } = useLang();

  const features = [
    {
      id: "verified",
      title: t("Verified Technicians", "सत्यापित तकनीशियन"),
      description: t("Background verified & trained", "सत्यापित और प्रशिक्षित तकनीशियन"),
      icon: "shield-checkmark",
      iconColor: "#0E9D47",
    },
    {
      id: "guarantee",
      title: t("Service Guarantee", "सेवा गारंटी"),
      description: t("100% satisfaction or money back", "100% संतुष्टि या मनी बैक"),
      icon: "ribbon",
      iconColor: "#0E9D47",
    },
    {
      id: "pricing",
      title: t("No Hidden Charges", "कोई हिडन चार्ज नहीं"),
      description: t("Upfront honest pricing", "अपफ्रंट ईमानदार मूल्य निर्धारण"),
      icon: "card",
      iconColor: "#0E9D47",
    },
    {
      id: "rating",
      title: t("4.8★ Rating", "4.8★ रेटिंग"),
      description: t("Trusted by 50,000+ customers", "50,000+ ग्राहकों द्वारा विश्वसनीय"),
      icon: "star",
      iconColor: "#FFD54F",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t("Why Choose HandysCompany", "HandysCompany क्यों चुनें?")}</Text>
      
      <View style={styles.grid}>
        {features.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    minHeight: 135,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  description: {
    fontSize: 10.5,
    color: "#757575",
    lineHeight: 14,
    fontWeight: "600",
  },
});