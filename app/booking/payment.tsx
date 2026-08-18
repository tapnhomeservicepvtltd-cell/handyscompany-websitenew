import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import { getBooking } from "../../services/api/bookings";
import { ApiError } from "../../services/api/client";
import { createRazorpayOrder, payWithWallet } from "../../services/api/payments";

const PAYMENT_METHODS = [
  { id: "upi", title: "UPI", subtitle: "Google Pay • PhonePe • Paytm • BHIM", icon: "qrcode-scan" },
  { id: "credit", title: "Credit Card", subtitle: "Visa • MasterCard • RuPay", icon: "credit-card" },
  { id: "debit", title: "Debit Card", subtitle: "All Major Banks", icon: "card-account-details" },
  { id: "netbanking", title: "Net Banking", subtitle: "50+ Banks Supported", icon: "bank" },
];

export default function PaymentScreen() {
  const router_ = router;
  const { bookingId, totalPayable: totalPayableParam, serviceName } = useLocalSearchParams<{
    bookingId: string;
    totalPayable?: string;
    serviceName?: string;
  }>();

  const [selected, setSelected] = useState("upi");
  const [useWallet, setUseWallet] = useState(false);
  const [paying, setPaying] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const walletBalance = 250;
  const totalAmount = Number(totalPayableParam ?? 49);
  const walletDeduction = useWallet ? Math.min(walletBalance, totalAmount) : 0;
  const payable = Math.max(totalAmount - walletDeduction, 0);

  const handlePayNow = async () => {
    if (!bookingId) {
      Alert.alert("Error", "Booking ID not found. Please try again.");
      return;
    }

    setPaying(true);
    try {
      if (selected === "cash") {
        // Cash on delivery — just mark booking and go to success
        router.push({
          pathname: "/booking/success",
          params: { bookingId, paymentMethod: "cash" },
        } as any);
        return;
      }

      if (useWallet && payable === 0) {
        // Full wallet payment
        await payWithWallet(bookingId);
        router.push({
          pathname: "/booking/success",
          params: { bookingId, paymentMethod: "wallet" },
        } as any);
        return;
      }

      // Razorpay integration
      setLoadingOrder(true);
      const order = await createRazorpayOrder(bookingId);
      setLoadingOrder(false);

      // TODO: Open Razorpay SDK here with order.orderId
      // For now simulate success
      Alert.alert(
        "Payment Gateway",
        `Order created: ₹${(order.amount / 100).toFixed(2)}\nProceed with ${selected.toUpperCase()}`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Pay Now",
            onPress: () => {
              router.push({
                pathname: "/booking/success",
                params: { bookingId, paymentMethod: selected },
              } as any);
            },
          },
        ],
      );
    } catch (caught) {
      Alert.alert(
        "Payment Failed",
        caught instanceof ApiError ? caught.message : "Unable to process payment. Try again.",
      );
    } finally {
      setPaying(false);
      setLoadingOrder(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.heading}>Choose Payment Method</Text>

        {PAYMENT_METHODS.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setSelected(item.id)}
            style={[styles.card, selected === item.id && styles.activeCard]}
          >
            <MaterialCommunityIcons name={item.icon as any} size={28} color="#00A651" />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.payTitle}>{item.title}</Text>
              <Text style={styles.paySubtitle}>{item.subtitle}</Text>
            </View>
            {selected === item.id && (
              <MaterialCommunityIcons name="check-circle" size={24} color="#00A651" />
            )}
          </Pressable>
        ))}

        {/* Wallet Toggle */}
        <View style={styles.walletCard}>
          <View style={styles.walletLeft}>
            <MaterialCommunityIcons name="wallet" size={28} color="#00A651" />
            <View style={{ marginLeft: 14 }}>
              <Text style={styles.walletTitle}>HandysCompany Wallet</Text>
              <Text style={styles.walletSub}>Balance ₹{walletBalance}</Text>
            </View>
          </View>
          <Switch
            value={useWallet}
            onValueChange={setUseWallet}
            trackColor={{ false: "#CBD5E1", true: "#00A651" }}
            thumbColor="#fff"
          />
        </View>

        {/* Bill Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryHeading}>Bill Summary</Text>

          {!!serviceName && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>{serviceName}</Text>
              <Text style={styles.billValue}>₹{totalAmount}</Text>
            </View>
          )}

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Labour Charge</Text>
            <Text style={[styles.billValue, { color: "#00A651" }]}>FREE (Membership)</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Material</Text>
            <Text style={styles.billValue}>Extra (if any)</Text>
          </View>

          {useWallet && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Wallet Used</Text>
              <Text style={[styles.billValue, { color: "#00A651" }]}>- ₹{walletDeduction}</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.billRow}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{payable}</Text>
          </View>
        </View>

        {/* Cash After Service */}
        <Pressable
          style={[styles.cashCard, selected === "cash" && styles.activeCard]}
          onPress={() => setSelected("cash")}
        >
          <MaterialCommunityIcons name="cash" size={28} color="#00A651" />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.payTitle}>Cash After Service</Text>
            <Text style={styles.paySubtitle}>Pay cash after work completion</Text>
          </View>
          {selected === "cash" && (
            <MaterialCommunityIcons name="check-circle" size={24} color="#00A651" />
          )}
        </Pressable>

        {/* Security note */}
        <View style={styles.secureRow}>
          <MaterialCommunityIcons name="shield-lock" size={16} color="#64748B" />
          <Text style={styles.secureText}>100% Secure · 256-bit SSL Encryption</Text>
        </View>
      </ScrollView>

      {/* Bottom Pay Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.payLabel}>Payable Amount</Text>
          <Text style={styles.payAmount}>₹{payable}</Text>
        </View>
        <Pressable
          style={[styles.payButton, paying && { opacity: 0.7 }]}
          onPress={handlePayNow}
          disabled={paying || loadingOrder}
        >
          {paying || loadingOrder
            ? <ActivityIndicator color="#FFF" />
            : (
              <>
                <MaterialCommunityIcons name="lock" size={18} color="#FFF" />
                <Text style={styles.payText}>
                  {payable === 0 ? "Pay via Wallet" : "Proceed To Pay"}
                </Text>
              </>
            )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, backgroundColor: "#FFF", borderBottomWidth: 1, borderColor: "#E5E7EB" },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#111827" },
  heading: { fontSize: 15, fontWeight: "800", color: "#111827", marginHorizontal: 16, marginTop: 20, marginBottom: 12 },

  card: { backgroundColor: "#FFF", marginHorizontal: 16, marginBottom: 10, borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#E5E7EB" },
  activeCard: { borderColor: "#00A651", backgroundColor: "#F0FDF4" },
  payTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  paySubtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },

  walletCard: { margin: 16, backgroundColor: "#FFF", borderRadius: 18, padding: 18, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#E5E7EB" },
  walletLeft: { flexDirection: "row", alignItems: "center" },
  walletTitle: { fontSize: 15, fontWeight: "900", color: "#111827" },
  walletSub: { marginTop: 4, fontSize: 12, color: "#64748B" },

  summaryCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: "#FFF", borderRadius: 18, padding: 18, borderWidth: 1, borderColor: "#E5E7EB" },
  summaryHeading: { fontSize: 16, fontWeight: "900", marginBottom: 16, color: "#111827" },
  billRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  billLabel: { fontSize: 14, color: "#64748B" },
  billValue: { fontSize: 14, fontWeight: "700", color: "#111827" },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 10 },
  totalLabel: { fontSize: 16, fontWeight: "900", color: "#111827" },
  totalValue: { fontSize: 20, fontWeight: "900", color: "#00A651" },

  cashCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: "#FFF", borderRadius: 18, padding: 18, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#E5E7EB" },

  secureRow: { flexDirection: "row", alignItems: "center", gap: 6, justifyContent: "center", marginVertical: 12 },
  secureText: { fontSize: 12, color: "#64748B", fontWeight: "600" },

  bottomBar: { padding: 16, backgroundColor: "#FFF", borderTopWidth: 1, borderColor: "#E5E7EB", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  payLabel: { fontSize: 12, color: "#64748B" },
  payAmount: { marginTop: 2, fontSize: 22, fontWeight: "900", color: "#00A651" },
  payButton: { height: 52, paddingHorizontal: 22, backgroundColor: "#00A651", borderRadius: 16, flexDirection: "row", alignItems: "center", gap: 8, justifyContent: "center" },
  payText: { marginLeft: 4, fontSize: 15, fontWeight: "900", color: "#FFF" },
});