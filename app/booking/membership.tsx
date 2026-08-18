import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { membershipsApi } from "../../services/membershipsApi";

export default function MembershipScreen() {
  const router = useRouter();
  const [membershipActive, setMembershipActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMembership = async () => {
      try {
        const memberships = await membershipsApi.myMemberships();
        setMembershipActive(memberships.some((item) => item.status === "ACTIVE"));
      } catch (error) {
        console.log("Error loading membership:", error);
        setMembershipActive(false);
      } finally {
        setLoading(false);
      }
    };

    loadMembership();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#111827" />
        </Pressable>
        <Text style={styles.title}>Membership</Text>
        <View style={{ width: 26 }} />
      </View>

      {loading ? (
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#00A651" />
        </View>
      ) : membershipActive ? (
        <View style={styles.content}>
          <MaterialCommunityIcons name="check-decagram" size={90} color="#00A651" />
          <Text style={styles.heading}>Membership Active</Text>
          <Text style={styles.sub}>{`Labour FREE\n₹49 Visit Charge\nMaterial Cost Extra\n1 FREE Home Cleaning (6 Months)`}</Text>
          <Pressable style={styles.button} onPress={() => router.push("../booking/coupon") as any}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.content}>
          <MaterialCommunityIcons name="crown" size={90} color="#F59E0B" />
          <Text style={styles.heading}>No Active Membership</Text>
          <Text style={styles.sub}>{`Buy Membership & Enjoy\nLabour FREE Services\n+ 1 FREE Home Cleaning`}</Text>

          <View style={styles.card}>
            <Text style={styles.plan}>Home Membership</Text>
            <Text style={styles.price}>₹699 / 6 Months</Text>
          </View>

          <Pressable style={styles.buyButton} onPress={() => router.push("/payment-gateway" as any)}>
            <Text style={styles.buyText}>Buy Membership</Text>
          </Pressable>

          <Pressable style={styles.skipButton} onPress={() => router.push("../booking/coupon") as any}>
            <Text style={styles.skipText}>Continue Without Membership</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { height: 60, backgroundColor: "#FFF", paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "900" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
  heading: { marginTop: 18, fontSize: 24, fontWeight: "900", color: "#111827", textAlign: "center" },
  sub: { marginTop: 10, textAlign: "center", fontSize: 15, lineHeight: 24, color: "#64748B" },
  card: { marginTop: 24, width: "100%", backgroundColor: "#FFF", padding: 22, borderRadius: 18, alignItems: "center", borderWidth: 1, borderColor: "#ECFDF3" },
  plan: { fontSize: 18, fontWeight: "900" },
  price: { marginTop: 8, fontSize: 28, fontWeight: "900", color: "#00A651" },
  buyButton: { marginTop: 24, height: 54, width: "100%", backgroundColor: "#00A651", borderRadius: 16, justifyContent: "center", alignItems: "center" },
  buyText: { color: "#FFF", fontWeight: "900", fontSize: 16 },
  skipButton: { marginTop: 16, height: 54, width: "100%", borderRadius: 16, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#00A651" },
  skipText: { color: "#00A651", fontWeight: "900", fontSize: 16 },
  button: { marginTop: 30, height: 54, width: "100%", backgroundColor: "#00A651", borderRadius: 16, justifyContent: "center", alignItems: "center" },
  buttonText: { color: "#FFF", fontWeight: "900", fontSize: 16 },
});