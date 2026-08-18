import React from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SummaryScreen() {
  const router = useRouter();

  // Simulated static data (Will fetch from Firebase/State management later)
  const booking = {
    service: "Electrician Service",
    address: "Home, Ashok Nagar, Gaya",
    date: "08 July 2026",
    time: "11:00 AM - 01:00 PM",
    membership: true,
    visitCharge: 49,
    labourCharge: 0,
    material: "Extra",
    coupon: 0,
    wallet: 49,
    paymentMethod: "UPI",
  };

  const total = booking.visitCharge - booking.wallet - booking.coupon;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Block */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={26}
              color="#111827"
            />
          </Pressable>
          <Text style={styles.headerTitle}>Order Summary</Text>
          <View style={{ width: 26 }} />
        </View>

        {/* 📦 Part 1: Booking Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          
          <View style={styles.item}>
            <MaterialCommunityIcons name="tools" size={22} color="#00A651" />
            <Text style={styles.itemText}>{booking.service}</Text>
          </View>

          <View style={styles.item}>
            <MaterialCommunityIcons name="map-marker" size={22} color="#00A651" />
            <Text style={styles.itemText}>{booking.address}</Text>
          </View>

          <View style={styles.item}>
            <MaterialCommunityIcons name="calendar" size={22} color="#00A651" />
            <Text style={styles.itemText}>{booking.date}</Text>
          </View>

          <View style={styles.item}>
            <MaterialCommunityIcons name="clock-outline" size={22} color="#00A651" />
            <Text style={styles.itemText}>{booking.time}</Text>
          </View>
        </View>

        {/* 💎 Part 2: Membership Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Membership</Text>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name={booking.membership ? "check-decagram" : "close-circle"}
              size={24}
              color={booking.membership ? "#00A651" : "#EF4444"}
            />
            <View style={{ marginLeft: 14 }}>
              <Text style={styles.memberTitle}>
                {booking.membership ? "Home Membership Active" : "No Active Membership"}
              </Text>
              <Text style={styles.memberSub}>
                {booking.membership ? "Labour Charge FREE" : "Normal Labour Charges Apply"}
              </Text>
            </View>
          </View>
        </View>

        {/* 💰 Part 2: Price Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price Details</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Visit Charge</Text>
            <Text style={styles.value}>₹{booking.visitCharge}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Labour Charge</Text>
            <Text style={[styles.value, { color: "#00A651" }]}>
              {booking.membership ? "FREE" : `₹${booking.labourCharge}`}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Material Cost</Text>
            <Text style={styles.value}>{booking.material}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Coupon</Text>
            <Text style={styles.value}>- ₹{booking.coupon}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Wallet</Text>
            <Text style={styles.value}>- ₹{booking.wallet}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{Math.max(total, 0)}</Text>
          </View>
        </View>

        {/* 💳 Part 2: Payment Method Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.item}>
            <MaterialCommunityIcons name="qrcode-scan" size={22} color="#00A651" />
            <Text style={styles.itemText}>{booking.paymentMethod}</Text>
          </View>
        </View>

        {/* 📜 Part 3: Terms & Conditions Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          
          <View style={styles.termRow}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#00A651" />
            <Text style={styles.termText}>
              Visit Charge is non-refundable after technician dispatch.
            </Text>
          </View>

          <View style={styles.termRow}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#00A651" />
            <Text style={styles.termText}>
              Material cost will be charged separately if required.
            </Text>
          </View>

          <View style={styles.termRow}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#00A651" />
            <Text style={styles.termText}>
              Technician may arrive within the selected time slot.
            </Text>
          </View>

          <View style={styles.termRow}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#00A651" />
            <Text style={styles.termText}>
              Cancellation is allowed before technician dispatch.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 🟢 Part 3: Premium Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.payNowLabel}>Total Payable</Text>
          <Text style={styles.payNowPrice}>₹{Math.max(total, 0)}</Text>
        </View>

        <Pressable
          style={styles.payButton}
          onPress={() => router.push("../booking/payment")}
        >
          <MaterialCommunityIcons name="lock" size={20} color="#FFF" />
          <Text style={styles.payButtonText}>Proceed</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Part 1 Styles
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingBottom: 120, // Prevents elements from overlapping under the absolute bottom bar
  },
  header: {
    height: 60,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },
  card: {
    margin: 16,
    marginBottom: 0, // Better relative layout control
    marginTop: 16,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 20,
    color: "#111827",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  itemText: {
    marginLeft: 14,
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  // Part 2 Styles
  memberTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
  },
  memberSub: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: "#64748B",
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#00A651",
  },

  // Part 3 Styles
  termRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  termText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    lineHeight: 22,
    color: "#475569",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  payNowLabel: {
    fontSize: 13,
    color: "#64748B",
  },
  payNowPrice: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "900",
    color: "#00A651",
  },
  payButton: {
    height: 54,
    paddingHorizontal: 24,
    backgroundColor: "#00A651",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  payButtonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "900",
  },
});