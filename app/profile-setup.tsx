import { Ionicons } from "@expo/vector-icons";
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
import { ApiError } from "../services/api/client";
import { getMyProfile } from "../services/api/users";
import { membershipsApi } from "../services/membershipsApi";

export default function ProfileSetupScreen() {
  const [userData, setUserData] = useState<any>(null);
  const [membership, setMembership] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      checkUserSession();
    }, [])
  );

  const checkUserSession = async () => {
    setLoading(true);
    try {
      const [profile, memberships] = await Promise.all([getMyProfile().catch(() => null), membershipsApi.myMemberships().catch(() => [])]);
      if (profile) {
        setIsLoggedIn(true);
        setUserData(profile);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
      const activeMembership = memberships.find((item: any) => item.status === "ACTIVE");
      setMembership(activeMembership ?? null);
    } catch (error) {
      console.log("Error fetching profile:", error);
      setIsLoggedIn(false);
      setUserData(null);
      setMembership(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectPayment = async () => {
    setPayLoading(true);
    try {
      const plans = await membershipsApi.plans();
      const preferredPlan = plans.find((plan) => Number(plan.price) > 0) ?? plans[0];
      if (!preferredPlan) {
        throw new Error("No membership plans are available right now.");
      }

      await membershipsApi.purchase(preferredPlan.id, `profile-setup-${Date.now()}`, "Profile setup membership purchase");
      Alert.alert(
        "Payment Successful! 🎉",
        "Your membership has been activated. Continue to complete your profile.",
        [
          {
            text: "Proceed to Registration",
            onPress: () => {
              router.push({ pathname: "/register" as any, params: { paymentId: `membership-${Date.now()}` } });
            },
          },
        ]
      );
    } catch (error) {
      const message = error instanceof ApiError ? error.message : error instanceof Error ? error.message : "Payment failed.";
      Alert.alert("Payment Failed", message);
    } finally {
      setPayLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00A651" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{userData?.fullName?.[0] || userData?.name?.[0] || "?"}</Text>
          </View>
          <Text style={styles.userName}>{userData?.fullName || userData?.name || "Welcome Guest (अतिथि)"}</Text>
          <Text style={styles.userPhone}>📱 {userData?.phoneNumber || "No Account Found"}</Text>
          <Text style={styles.userEmail}>✉️ {userData?.email || "Subscribe to create account"}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Subscription Details / सदस्यता विवरण</Text>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Plan Status:</Text>
            <Text style={[styles.value, membership ? styles.activeText : styles.inactiveText]}>
              {membership ? "Active ✅" : "Not Active ❌"}
            </Text>
          </View>

          {membership && (
            <View>
              <View style={styles.row}>
                <Text style={styles.label}>Plan Name:</Text>
                <Text style={styles.value}>{membership.plan?.name || "Membership"}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Valid Till:</Text>
                <Text style={[styles.value, { color: "#FF3B30" }]}>
                  {membership.expiresAt ? new Date(membership.expiresAt).toLocaleDateString() : "N/A"}
                </Text>
              </View>
            </View>
          )}
        </View>

        {!membership ? (
          <TouchableOpacity style={styles.subscribeBannerCard} onPress={handleDirectPayment} disabled={payLoading}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}>
              <View style={styles.iconBgContainer}>
                {payLoading ? <ActivityIndicator size="small" color="#00A651" /> : <Ionicons name="card" size={22} color="#00A651" />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bookBtnTitle}>Unlock Free Home Services</Text>
                <Text style={styles.bookBtnSub}>Premium Home Plan @ ₹699/Year</Text>
              </View>
            </View>
            <View style={styles.inlineSubscribeBtn}>
              <Text style={styles.inlineBtnText}>Subscribe Now</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.bookServiceCard} onPress={() => router.push("/payment-gateway" as any)}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={styles.iconBgContainerActive}>
                <Ionicons name="construct" size={22} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.bookBtnTitleActive}>Book a Free Home Service</Text>
                <Text style={styles.bookBtnSubActive}>फ्री होम सर्विस बुक करें</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        {!isLoggedIn && (
          <TouchableOpacity style={styles.loginBtnSecondary} onPress={() => router.push("/login" as any)}>
            <Text style={styles.loginBtnSecondaryText}>Already a Member? Login Here</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F7FB" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 16 },
  profileCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 20, alignItems: "center", borderWidth: 1, borderColor: "#E1F5E6", marginBottom: 16, elevation: 2 },
  avatarCircle: { width: 68, height: 68, backgroundColor: "#00A651", borderRadius: 34, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { color: "#FFFFFF", fontSize: 26, fontWeight: "900" },
  userName: { fontSize: 18, fontWeight: "800", color: "#1A1A2E" },
  userPhone: { fontSize: 13, fontWeight: "600", color: "#556B5D", marginTop: 5 },
  userEmail: { fontSize: 12, fontWeight: "600", color: "#889A8F", marginTop: 2 },
  infoCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#E1F5E6", marginBottom: 16, elevation: 2 },
  sectionTitle: { fontSize: 13, fontWeight: "800", color: "#00A651" },
  divider: { height: 1, backgroundColor: "#E1F5E6", marginVertical: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  label: { fontSize: 13, fontWeight: "700", color: "#556B5D" },
  value: { fontSize: 13, fontWeight: "800", color: "#1A1A2E" },
  activeText: { color: "#00A651" },
  inactiveText: { color: "#FF3B30" },
  subscribeBannerCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1.5, borderColor: "#00A651", borderStyle: "dashed", elevation: 1, marginTop: 4 },
  iconBgContainer: { width: 40, height: 40, backgroundColor: "#E6F6ED", borderRadius: 10, justifyContent: "center", alignItems: "center" },
  bookBtnTitle: { color: "#1A1A2E", fontSize: 14, fontWeight: "800" },
  bookBtnSub: { color: "#556B5D", fontSize: 11, fontWeight: "600", marginTop: 2 },
  inlineSubscribeBtn: { backgroundColor: "#00A651", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  inlineBtnText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  bookServiceCard: { backgroundColor: "#00A651", borderRadius: 16, padding: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between", elevation: 3, marginTop: 4 },
  iconBgContainerActive: { width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 10, justifyContent: "center", alignItems: "center" },
  bookBtnTitleActive: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  bookBtnSubActive: { color: "#E6F6ED", fontSize: 11, fontWeight: "600", marginTop: 2 },
  loginBtnSecondary: { marginTop: 20, padding: 12, width: "100%", alignItems: "center" },
  loginBtnSecondaryText: { color: "#00A651", fontSize: 13, fontWeight: "700" },
});