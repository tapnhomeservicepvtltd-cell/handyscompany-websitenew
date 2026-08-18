import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMyProfile } from "../services/api/users";
import { membershipsApi } from "../services/membershipsApi";
import { useLang } from "./context/LanguageContext";

export default function SubscribeScreen() {
  const { t, lang, setLang } = useLang();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [membership, setMembership] = useState<any>(null);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const [profile, memberships] = await Promise.all([getMyProfile().catch(() => null), membershipsApi.myMemberships().catch(() => [])]);
      setUserData(profile);
      setMembership(memberships.find((item: any) => item.status === "ACTIVE") ?? null);
    } catch (error) {
      console.log("Error fetching user data:", error);
      setUserData(null);
      setMembership(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "--/--/----";
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const handleBookService = () => {
    if (!membership) {
      Alert.alert(
        t("Plan Inactive", "प्लान एक्टिव नहीं है"),
        t("Please activate your plan to book a free service.", "फ्री सर्विस बुक करने के लिए कृपया पहले प्लान एक्टिव करें।")
      );
      return;
    }
    router.push("/payment-gateway" as any);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00A651" />
      </View>
    );
  }

  const isActive = Boolean(membership);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FB" />

      {/* LANGUAGE SELECTOR */}
      <View style={styles.headerRow}>
        <View style={styles.langContainer}>
          <TouchableOpacity 
            style={[styles.langBtn, lang === "en" && styles.langBtnActive]} 
            onPress={() => setLang("en")}
          >
            <Text style={[styles.langText, lang === "en" && styles.langTextActive]}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.langBtn, lang === "hi" && styles.langBtnActive]} 
            onPress={() => setLang("hi")}
          >
            <Text style={[styles.langText, lang === "hi" && styles.langTextActive]}>हिं</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 👤 1. PROFILE DETAILS CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Ionicons name="person-circle" size={18} color="#00A651" /> 
            {t(" Profile Details", " प्रोफाइल डिटेल्स")}
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t("Name:", "नाम:")}</Text>
            <Text style={styles.infoValue}>{userData?.fullName || userData?.name || "User"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t("Mobile:", "मोबाइल:")}</Text>
            <Text style={styles.infoValue}>{userData?.phoneNumber || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t("Email:", "ईमेल:")}</Text>
            <Text style={styles.infoValue}>{userData?.email || "N/A"}</Text>
          </View>
        </View>

        {/* 💳 2. PLAN VALIDITY CARD */}
        <View style={[styles.card, isActive ? styles.activeCard : styles.inactiveCard]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text style={styles.cardTitle}>
              <MaterialCommunityIcons name="shield-check" size={18} color={isActive ? "#00A651" : "#FF3B30"} />
              {t(" Plan Status", " प्लान स्टेटस")}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: isActive ? "#E6F6ED" : "#FFEEEE" }]}>
              <Text style={[styles.statusBadgeText, { color: isActive ? "#00A651" : "#FF3B30" }]}>
                {isActive ? t("ACTIVE ✅", "एक्टिव ✅") : t("INACTIVE ❌", "नॉट एक्टिव ❌")}
              </Text>
            </View>
          </View>

          <Text style={styles.planNameText}>{membership?.plan?.name || t("No Active Plan", "कोई एक्टिव प्लान नहीं है")}</Text>

          {isActive && (
            <View style={{ marginTop: 10, borderTopWidth: 1, borderColor: "#E1F5E6", paddingTop: 10 }}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t("Activated On:", "शुरू होने की तिथि:")}</Text>
                <Text style={styles.infoValue}>{formatDate(membership?.startsAt)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t("Valid Till:", "कब तक मान्य है:")}</Text>
                <Text style={[styles.infoValue, { fontWeight: "700", color: "#00A651" }]}>
                  {formatDate(membership?.expiresAt)}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* 🛠️ 3. SERVICE BOOKING OPTION */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <MaterialCommunityIcons name="gavel" size={18} color="#00A651" />
            {t(" Book Home Service", " होम सर्विस बुक करें")}
          </Text>
          <Text style={styles.serviceDesc}>
            {t(
              "Get free labor for Plumbing, Electrical, Carpenter, and Appliance repair under your premium membership.",
              "अपनी प्रीमियम मेंबरशिप के तहत प्लंबिंग, इलेक्ट्रिकल, कारपेंटर और अप्लायंस रिपेयर के लिए फ्री लेबर सर्विस पाएं।"
            )}
          </Text>

          <TouchableOpacity 
            style={[styles.bookingBtn, !isActive && styles.bookingBtnDisabled]} 
            activeOpacity={0.85}
            onPress={handleBookService}
          >
            <MaterialCommunityIcons name="calendar-plus" size={20} color="#fff" />
            <Text style={styles.bookingBtnText}>
              {t("Book A Service Now", "अभी सर्विस बुक करें")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* BACK TO HOME BUTTON */}
        <TouchableOpacity style={styles.homeBtn} onPress={() => router.replace("/(tabs)")}>
          <Ionicons name="home" size={18} color="#00A651" />
          <Text style={styles.homeBtnText}>{t("Go to Home Screen", "होम स्क्रीन पर जाएँ")}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F7FB" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerRow: { flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 20, paddingTop: 10 },
  langContainer: { flexDirection: "row", backgroundColor: "#E6F6ED", borderRadius: 15, padding: 3, borderWidth: 1, borderColor: "#B3E6C9" },
  langBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  langBtnActive: { backgroundColor: "#00A651" },
  langText: { fontSize: 12, fontWeight: "700", color: "#00A651" },
  langTextActive: { color: "#FFFFFF" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 40 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: "#E1F5E6", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
  activeCard: { borderColor: "#00A651", borderWidth: 1.5 },
  inactiveCard: { borderColor: "#FF3B30", borderWidth: 1 },
  cardTitle: { fontSize: 15, fontWeight: "800", color: "#1A1A2E", marginBottom: 14, flexDirection: "row", alignItems: "center" },
  infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  infoLabel: { fontSize: 13, color: "#556B5D", fontWeight: "600" },
  infoValue: { fontSize: 14, color: "#1A1A2E", fontWeight: "700" },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  statusBadgeText: { fontSize: 11, fontWeight: "800" },
  planNameText: { fontSize: 18, fontWeight: "800", color: "#1A1A2E" },
  serviceDesc: { fontSize: 13, color: "#556B5D", fontWeight: "600", lineHeight: 18, marginBottom: 16 },
  bookingBtn: { flexDirection: "row", backgroundColor: "#00A651", padding: 15, borderRadius: 14, justifyContent: "center", alignItems: "center", gap: 8 },
  bookingBtnDisabled: { backgroundColor: "#A3E6C1" },
  bookingBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  homeBtn: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 10, padding: 10 },
  homeBtnText: { color: "#00A651", fontWeight: "700", fontSize: 14 },
});