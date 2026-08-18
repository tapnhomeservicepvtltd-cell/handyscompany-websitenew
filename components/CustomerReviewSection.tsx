// components/CustomerReviewSection.tsx
// Premium horizontal scroll of exactly 3 customer reviews with Unsplash profile images and dates.

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { useLang } from "@/app/context/LanguageContext";
import { HomeColors } from "@/constants/homeTheme";

const reviewsData = [
  {
    id: "1",
    name: "Rahul Sharma",
    city: "Noida",
    rating: 5,
    date: "15 Jul 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    reviewEn: "Excellent service! AC repair done in 30 minutes. Very professional technician.",
    reviewHi: "बेहतरीन सर्विस! 30 मिनट में एसी रिपेयर हो गया। बहुत ही प्रोफेशनल तकनीशियन।",
  },
  {
    id: "2",
    name: "Priya Mehta",
    city: "Delhi",
    rating: 5,
    date: "12 Jul 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    reviewEn: "Membership is worth every rupee. Saved ₹3000+ on plumbing repairs!",
    reviewHi: "मेंबरशिप हर रुपये के लायक है। प्लंबिंग रिपेयर पर ₹3000+ बचाए!",
  },
  {
    id: "3",
    name: "Amit Kumar",
    city: "Mumbai",
    rating: 5,
    date: "10 Jul 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    reviewEn: "On-time, no hidden charges. Best home service app.",
    reviewHi: "समय पर, कोई हिडन चार्ज नहीं। बेस्ट होम सर्विस ऐप।",
  },
];

export default function CustomerReviewSection() {
  const { t } = useLang();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{t("Customer Reviews", "कस्टमर रिव्यू")}</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>4.8 ★</Text>
          </View>
        </View>
        <Text style={styles.viewAll}>{t("View All →", "सभी देखें →")}</Text>
      </View>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {reviewsData.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* User Info */}
            <View style={styles.userInfo}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.userText}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.location}>
                  {item.city} • {item.date}
                </Text>
              </View>
            </View>

            {/* Stars */}
            <View style={styles.starsRow}>
              {Array.from({ length: item.rating }).map((_, idx) => (
                <Ionicons key={idx} name="star" size={14} color="#FFD54F" />
              ))}
            </View>

            {/* Review Text */}
            <Text style={styles.reviewText} numberOfLines={3}>
              {t(item.reviewEn, item.reviewHi)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  ratingBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingBadgeText: {
    color: "#0E9D47",
    fontSize: 10.5,
    fontWeight: "800",
  },
  viewAll: {
    fontSize: 12.5,
    fontWeight: "800",
    color: HomeColors.primary,
  },
  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  card: {
    width: 260,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F5F5F5",
  },
  userText: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  location: {
    fontSize: 10.5,
    color: "#757575",
    marginTop: 1,
  },
  starsRow: {
    flexDirection: "row",
    gap: 2,
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 12,
    color: "#424242",
    lineHeight: 18,
  },
});