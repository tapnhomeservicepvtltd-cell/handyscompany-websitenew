import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useLang } from "@/app/context/LanguageContext";
import { SvgIcon } from "./icons/SvgIcons";

const services = [
  {
    id: "1",
    titleEn: "Fan Repair",
    titleHi: "पंखा रिपेयर",
    icon: "electrical_fan",
    badgeEn: "Most Booked",
    badgeHi: "सबसे ज्यादा बुक",
    route: "/service/electrical_fan",
  },
  {
    id: "2",
    titleEn: "Tap Repair",
    titleHi: "नल रिपेयर",
    icon: "tap-repair",
    badgeEn: "Fast Service",
    badgeHi: "फास्ट सर्विस",
    route: "/service/tap-repair",
  },
  {
    id: "3",
    titleEn: "Switch Repair",
    titleHi: "स्विच रिपेयर",
    icon: "electrical_switch",
    badgeEn: "Popular",
    badgeHi: "पॉपुलर",
    route: "/service/electrical_switch",
  },
  {
    id: "4",
    titleEn: "RO Repair",
    titleHi: "आरो रिपेयर",
    icon: "ro-repair",
    badgeEn: "Trending",
    badgeHi: "ट्रेंडिंग",
    route: "/service/ro-repair",
  },
  {
    id: "5",
    titleEn: "AC Service",
    titleHi: "एसी सर्विस",
    icon: "ac-repair",
    badgeEn: "Top Rated",
    badgeHi: "टॉप रेटेड",
    route: "/service/ac-repair",
  },
  {
    id: "6",
    titleEn: "Bathroom Cleaning",
    titleHi: "बाथरूम क्लीनिंग",
    icon: "bathroom-cleaning",
    badgeEn: "Best Seller",
    badgeHi: "बेस्ट सेलर",
    route: "/service/bathroom-cleaning",
  },
];

export default function PopularServices() {
  const router = useRouter();
  const { t } = useLang();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>🔥 {t("Most Booked Services", "सबसे ज़्यादा बुक की जाने वाली सेवाएं")}</Text>
        <Pressable onPress={() => router.push("/explore" as any)}>
          <Text style={styles.viewAll}>{t("View All", "सभी देखें")}</Text>
        </Pressable>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 4 }}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && { transform: [{ scale: 0.97 }] }]}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{t(item.badgeEn, item.badgeHi)}</Text>
            </View>

            <View style={styles.iconBox}>
              <SvgIcon name={item.icon} size={36} color="#0F8F4D" />
            </View>

            <Text style={styles.title}>{t(item.titleEn, item.titleHi)}</Text>
            <Text style={styles.visit}>{t("₹49 Visit", "₹49 विज़िट")}</Text>

            <View style={styles.freeChip}>
              <Text style={styles.freeText}>{t("Labour FREE", "लेबर फ्री")}</Text>
            </View>

            <Pressable style={styles.bookButton} onPress={() => router.push(item.route as any)}>
              <Text style={styles.bookText}>{t("Book Now", "अभी बुक करें")}</Text>
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, marginBottom: 24 },
  header: {
    marginHorizontal: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: { fontSize: 18, fontWeight: "900", color: "#0F172A" },
  viewAll: { color: "#0F8F4D", fontSize: 13.5, fontWeight: "800" },
  card: {
    width: 210,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginRight: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EAF4EE",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#EAFBF2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: { color: "#0F8F4D", fontSize: 10, fontWeight: "900" },
  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 24,
    backgroundColor: "#F4FFF8",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  title: { textAlign: "center", fontSize: 15, fontWeight: "800", color: "#0F172A" },
  visit: { textAlign: "center", marginTop: 8, fontSize: 17, fontWeight: "900", color: "#0F8F4D" },
  freeChip: { marginTop: 10, alignSelf: "center", backgroundColor: "#0F8F4D", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 },
  freeText: { color: "#FFFFFF", fontSize: 10.5, fontWeight: "900" },
  bookButton: { marginTop: 12, backgroundColor: "#0F172A", borderRadius: 14, height: 42, justifyContent: "center", alignItems: "center" },
  bookText: { color: "#FFFFFF", fontSize: 13.5, fontWeight: "900" },
});