import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getBooking } from "../../services/api/bookings";
import { Booking } from "../../services/api/bookings";

export default function BookingSuccessScreen() {
  const { bookingId, paymentMethod } = useLocalSearchParams<{
    bookingId?: string;
    paymentMethod?: string;
  }>();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [matchingStatus, setMatchingStatus] = useState<"searching" | "assigned">("searching");

  // Fetch real booking data
  useEffect(() => {
    if (!bookingId) return;
    setLoadingBooking(true);
    getBooking(bookingId)
      .then((b) => setBooking(b))
      .catch(() => {}) // silent fail — show mock
      .finally(() => setLoadingBooking(false));
  }, [bookingId]);

  // Technician assignment simulation (5s)
  useEffect(() => {
    const timer = setTimeout(() => setMatchingStatus("assigned"), 5000);
    return () => clearTimeout(timer);
  }, []);

  // OTP mock (first 4 digits of bookingId or fixed)
  const otp = bookingId?.replace(/\D/g, '').slice(0, 4) || "4821";

  // Service name from booking or fallback
  const serviceName = booking?.service?.name ?? "Home Service";
  const scheduledDate = booking?.scheduledAt
    ? new Date(booking.scheduledAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    : "Scheduled Soon";
  const displayBookingId = booking?.bookingNumber ?? bookingId ?? "HC000";

  const techName = booking?.technician?.fullName ?? "Ravi Kumar";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* 🎉 1. Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-sharp" size={46} color="#FFF" />
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSub}>Your request has been accepted successfully.</Text>
          {paymentMethod === "cash" && (
            <View style={styles.paymentBadge}>
              <MaterialCommunityIcons name="cash" size={14} color="#854D0E" />
              <Text style={styles.paymentBadgeText}>Cash After Service Selected</Text>
            </View>
          )}
          {paymentMethod === "wallet" && (
            <View style={[styles.paymentBadge, { backgroundColor: "#DCFCE7", borderColor: "#BBF7D0" }]}>
              <MaterialCommunityIcons name="wallet" size={14} color="#166534" />
              <Text style={[styles.paymentBadgeText, { color: "#166534" }]}>Paid via Wallet</Text>
            </View>
          )}
        </View>

        {/* ⚙️ 2. Matching Status */}
        <View style={[styles.card, matchingStatus === "searching" ? styles.bgLightPurple : styles.bgLightGreen]}>
          {matchingStatus === "searching" ? (
            <View style={styles.row}>
              <ActivityIndicator size="small" color="#6366F1" style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.statusTitle}>Finding Nearest Expert...</Text>
                <Text style={styles.statusSub}>Matching with the best rated professional in your area.</Text>
              </View>
            </View>
          ) : (
            <View style={styles.row}>
              <View style={styles.greenCheckCircle}>
                <Ionicons name="shield-checkmark" size={18} color="#FFF" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.statusTitle, { color: "#00A651" }]}>Expert Assigned!</Text>
                <Text style={styles.statusSub}>A verified HandysCompany professional is confirmed.</Text>
              </View>
            </View>
          )}
        </View>

        {/* 👷 3. Technician Card + OTP */}
        {matchingStatus === "assigned" && (
          <View style={styles.card}>
            <Text style={styles.sectionHeading}>Assigned Professional</Text>
            <View style={styles.profileRow}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop" }}
                style={styles.avatar}
              />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.expertName}>{techName}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 3 }}>
                  <Ionicons name="star" size={13} color="#FBBF24" />
                  <Text style={styles.ratingText}>4.9 · 2,500+ Jobs</Text>
                </View>
                <Text style={styles.verifiedTag}>🛡️ Background Checked & Verified</Text>
              </View>
              <Pressable style={styles.callBtn} onPress={() => {}}>
                <Ionicons name="call" size={20} color="#00A651" />
              </Pressable>
            </View>

            <View style={styles.divider} />

            {/* OTP */}
            <View style={styles.otpBox}>
              <MaterialCommunityIcons name="shield-lock-outline" size={22} color="#0F172A" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.otpTitle}>Share Start OTP at service location</Text>
                <Text style={styles.otpSub}>Do not share before the expert arrives.</Text>
              </View>
              <View style={styles.otpBadge}>
                <Text style={styles.otpCode}>{otp}</Text>
              </View>
            </View>
          </View>
        )}

        {/* 📦 4. Booking Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Booking Summary</Text>
          {[
            { label: "Booking ID", value: displayBookingId },
            { label: "Service", value: serviceName },
            { label: "Scheduled", value: scheduledDate },
            { label: "Payment", value: paymentMethod === "cash" ? "Cash After Service" : paymentMethod === "wallet" ? "Wallet" : (paymentMethod ?? "UPI")?.toUpperCase() },
          ].map(({ label, value }) => (
            <View key={label} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{label}</Text>
              <Text style={styles.infoValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* 🎮 5. Action Buttons */}
        <View style={{ paddingHorizontal: 16, marginTop: 6 }}>
          <Pressable
            style={styles.trackButton}
            onPress={() => router.push({ pathname: "/booking/tracking", params: { bookingId } } as any)}
          >
            <MaterialCommunityIcons name="map-marker-path" size={20} color="#FFF" />
            <Text style={styles.trackText}>Live Track Expert</Text>
          </Pressable>

          <Pressable
            style={styles.materialBtn}
            onPress={() => router.push({ pathname: "/booking/material-approval", params: { bookingId } } as any)}
          >
            <MaterialCommunityIcons name="clipboard-list" size={20} color="#00A651" />
            <Text style={styles.materialBtnText}>View Material Approval</Text>
          </Pressable>

          <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            <Pressable
              style={[styles.homeButton, { flex: 1, marginBottom: 0 }]}
              onPress={() => Alert.alert("Reschedule", "Please select a new date and time from the upcoming screen.")}
            >
              <Text style={styles.homeText}>Reschedule</Text>
            </Pressable>
            
            <Pressable style={[styles.homeButton, { flex: 1, marginBottom: 0 }]} onPress={() => router.replace("/(tabs)")}>
              <Text style={styles.homeText}>Back to Home</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },

  successHeader: { alignItems: "center", paddingVertical: 28, paddingHorizontal: 20, backgroundColor: "#FFF", borderBottomWidth: 1, borderColor: "#E2E8F0" },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#00A651", justifyContent: "center", alignItems: "center", shadowColor: "#00A651", shadowOpacity: 0.25, shadowRadius: 8, elevation: 5 },
  successTitle: { fontSize: 24, fontWeight: "900", color: "#0F172A", marginTop: 16 },
  successSub: { fontSize: 13, color: "#64748B", marginTop: 6, textAlign: "center", fontWeight: "500" },
  paymentBadge: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 12, backgroundColor: "#FEF3C7", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: "#FDE68A" },
  paymentBadgeText: { fontSize: 12, color: "#854D0E", fontWeight: "700" },

  card: { backgroundColor: "#fff", marginHorizontal: 16, marginTop: 14, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#E2E8F0" },
  bgLightPurple: { backgroundColor: "#EEF2FF", borderColor: "#C7D2FE" },
  bgLightGreen: { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" },

  row: { flexDirection: "row", alignItems: "center" },
  statusTitle: { fontSize: 14, fontWeight: "800", color: "#4F46E5" },
  statusSub: { fontSize: 11, color: "#64748B", marginTop: 3, fontWeight: "600" },
  greenCheckCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#00A651", justifyContent: "center", alignItems: "center" },

  sectionHeading: { fontSize: 15, fontWeight: "900", color: "#0F172A", marginBottom: 14 },
  profileRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#CBD5E1" },
  expertName: { fontSize: 16, fontWeight: "800", color: "#0F172A" },
  ratingText: { fontSize: 12, color: "#475569", fontWeight: "700" },
  verifiedTag: { fontSize: 11, color: "#00A651", fontWeight: "700", marginTop: 4 },
  callBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#E6F6ED", justifyContent: "center", alignItems: "center" },

  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 14 },
  otpBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAFC", padding: 12, borderRadius: 14, borderWidth: 1, borderColor: "#E2E8F0" },
  otpTitle: { fontSize: 13, fontWeight: "800", color: "#0F172A" },
  otpSub: { fontSize: 11, color: "#64748B", marginTop: 2, fontWeight: "600" },
  otpBadge: { backgroundColor: "#0F172A", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  otpCode: { color: "#FFF", fontWeight: "900", fontSize: 16, letterSpacing: 2 },

  infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  infoLabel: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  infoValue: { fontSize: 13, color: "#1E293B", fontWeight: "700", maxWidth: "60%", textAlign: "right" },

  trackButton: { height: 52, backgroundColor: "#00A651", borderRadius: 16, justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 8, elevation: 2, marginBottom: 10 },
  trackText: { color: "#FFF", fontSize: 15, fontWeight: "900" },
  materialBtn: { height: 52, borderRadius: 16, borderWidth: 1.5, borderColor: "#00A651", justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 8, marginBottom: 10 },
  materialBtnText: { fontSize: 15, fontWeight: "800", color: "#00A651" },
  homeButton: { height: 52, borderRadius: 16, borderWidth: 1, borderColor: "#CBD5E1", justifyContent: "center", alignItems: "center", marginBottom: 10 },
  homeText: { fontSize: 15, fontWeight: "800", color: "#64748B" },
});