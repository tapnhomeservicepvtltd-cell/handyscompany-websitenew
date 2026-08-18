import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { createBooking } from "../../services/api/bookings";
import { ApiError } from "../../services/api/client";
import { getAvailableCoupons } from "../../services/api/coupons";
import { getWalletBalance } from "../../services/api/wallet";
import { membershipsApi, type CustomerMembership } from "../../services/membershipsApi";

// ─── Standard labour charge rate (fallback when no membership) ─────────────
// This is the default visit/labour charge when a user has no active membership.
// It should ideally come from app-level settings; kept as a named constant for clarity.
const DEFAULT_LABOUR_CHARGE = 299;

export default function CheckoutScreen() {
  // ── Params from full chain ─────────────────────────────────────────────
  const {
    serviceId,
    serviceName,
    variantId,
    variantName,
    variantBrand,
    variantPrice,
    problemId,
    addonsJson,
    addonsTotal,
    brandAddonsJson,
    brandAddonsTotal,
    visitCharge: visitChargeParam,
    finalPrice: finalPriceParam,
    addressId,
    scheduledAt,
  } = useLocalSearchParams<{
    serviceId: string;
    serviceName?: string;
    variantId?: string;
    variantName?: string;
    variantBrand?: string;
    variantPrice?: string;
    problemId?: string;
    addonsJson?: string;
    addonsTotal?: string;
    brandAddonsJson?: string;
    brandAddonsTotal?: string;
    visitCharge?: string;
    finalPrice?: string;
    addressId: string;
    scheduledAt: string;
  }>();

  // ── Derived values from params ─────────────────────────────────────────
  const visitCharge = Number(visitChargeParam ?? 49);
  const parsedAddonsTotal = Number(addonsTotal ?? 0);
  const parsedBrandAddonsTotal = Number(brandAddonsTotal ?? 0);

  // ── Real-time membership & wallet state ───────────────────────────────
  const [activeMembership, setActiveMembership] = useState<CustomerMembership | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(true);

  // Derived: is membership active?
  const isMembershipActive = activeMembership?.status === "ACTIVE";
  // Derived: labour charge waived for members
  const labourCharge = DEFAULT_LABOUR_CHARGE;

  // ── States ────────────────────────────────────────────────────────────
  const [useWallet, setUseWallet] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // ── Load membership status and wallet balance on mount ────────────────
  useEffect(() => {
    let cancelled = false;

    const loadCheckoutData = async () => {
      try {
        const [memberships, walletData] = await Promise.all([
          membershipsApi.myMemberships(),
          getWalletBalance(),
        ]);

        if (cancelled) return;

        // Find the most recently active membership (if any)
        const active = memberships.find((m) => m.status === "ACTIVE") ?? null;
        setActiveMembership(active);
        setWalletBalance(Number(walletData.balance));
      } catch {
        // Non-fatal: proceed with no membership / zero wallet balance
        // User can still complete the booking without these discounts
        if (!cancelled) {
          setActiveMembership(null);
          setWalletBalance(0);
        }
      } finally {
        if (!cancelled) setCheckoutLoading(false);
      }
    };

    loadCheckoutData();
    return () => { cancelled = true; };
  }, []);

  // ── Live Price Calculation ─────────────────────────────────────────────
  const priceBreakdown = useMemo(() => {
    const labour = isMembershipActive ? 0 : labourCharge;
    const membershipSaving = isMembershipActive ? labourCharge : 0;
    const couponDiscount = appliedCoupon?.discount ?? 0;
    const subtotal = visitCharge + labour + parsedAddonsTotal + parsedBrandAddonsTotal;
    const gst = Math.round(subtotal * 0.18);
    const afterCoupon = subtotal + gst - couponDiscount;
    const walletUsed = useWallet ? Math.min(walletBalance, afterCoupon) : 0;
    const totalPayable = Math.max(afterCoupon - walletUsed, 0);
    return { labour, membershipSaving, couponDiscount, subtotal, gst, walletUsed, totalPayable };
  }, [isMembershipActive, appliedCoupon, useWallet, visitCharge, parsedAddonsTotal, parsedBrandAddonsTotal, walletBalance, labourCharge]);

  // ── Coupon apply ───────────────────────────────────────────────────────
  const applyCoupon = useCallback(async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const coupons = await getAvailableCoupons();
      const found = coupons.find(
        (c: any) => c.code?.toUpperCase() === couponCode.toUpperCase()
      );
      const discount = found ? Number(found.discountValue ?? 0) : 0;

      if (discount > 0) {
        setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
      } else {
        Alert.alert("Invalid Coupon", "This coupon code is not valid or has expired.");
      }
    } catch {
      Alert.alert("Coupon Error", "Could not verify coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  }, [couponCode]);

  // ── Place Booking ─────────────────────────────────────────────────────
  const handlePlaceBooking = useCallback(async () => {
    if (!serviceId || !addressId || !scheduledAt) {
      Alert.alert("Missing Info", "Please select service, address and time again.");
      return;
    }
    setSubmitting(true);
    try {
      const booking = await createBooking({
        serviceId,
        addressId,
        scheduledAt,
        couponCode: appliedCoupon?.code,
        notes: [problemId, variantName, specialInstructions].filter(Boolean).join(" | "),
      });
      router.push({
        pathname: "/booking/payment",
        params: {
          bookingId: booking.id,
          totalPayable: String(priceBreakdown.totalPayable),
          serviceName: serviceName ?? "Service",
        },
      } as any);
    } catch (caught) {
      Alert.alert(
        "Booking Failed",
        caught instanceof ApiError ? caught.message : "Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }, [serviceId, addressId, scheduledAt, appliedCoupon, problemId, variantName, serviceName, priceBreakdown, specialInstructions]);

  // ── Loading skeleton ───────────────────────────────────────────────────
  if (checkoutLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </Pressable>
          <Text style={styles.headerTitle}>Review & Pay</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
          <ActivityIndicator size="large" color="#00A651" />
          <Text style={{ color: "#64748B", fontSize: 14, fontWeight: "600" }}>
            Loading your checkout…
          </Text>
        </View>
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerTitle}>Review & Pay</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>

        {/* ── 1. Booking Summary Card ── */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeading}>Booking Summary</Text>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.editActionText}>Edit</Text>
            </Pressable>
          </View>

          {!!serviceName && (
            <View style={styles.summaryRow}>
              <MaterialCommunityIcons name="tools" size={15} color="#00A651" />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.summaryLabel}>Service</Text>
                <Text style={styles.summaryValue}>{serviceName}</Text>
              </View>
            </View>
          )}
          {!!variantName && (
            <View style={styles.summaryRow}>
              <MaterialCommunityIcons name="format-list-bulleted" size={15} color="#00A651" />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.summaryLabel}>Variant</Text>
                <Text style={styles.summaryValue}>{variantName}{variantBrand ? ` · ${variantBrand}` : ''}</Text>
              </View>
            </View>
          )}
          {!!problemId && (
            <View style={styles.summaryRow}>
              <MaterialCommunityIcons name="alert-circle-outline" size={15} color="#00A651" />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.summaryLabel}>Problem</Text>
                <Text style={styles.summaryValue}>{problemId}</Text>
              </View>
            </View>
          )}
          {!!scheduledAt && (
            <View style={styles.summaryRow}>
              <Ionicons name="calendar-sharp" size={15} color="#00A651" />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.summaryLabel}>Scheduled</Text>
                <Text style={styles.summaryValue}>
                  {new Date(scheduledAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* ── 2. Membership Widget ── */}
        {isMembershipActive && (
          <View style={[styles.card, styles.membershipCard]}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <MaterialCommunityIcons name="crown" size={22} color="#CA8A04" />
                <Text style={styles.membershipTitle}>{activeMembership?.plan?.name ?? 'Membership'} Active</Text>
              </View>
              <View style={styles.freeBadge}>
                <Text style={styles.freeBadgeText}>SAVING ₹{labourCharge}</Text>
              </View>
            </View>
            <Text style={styles.membershipSub}>Labour charges are 100% FREE for you. Valid till {activeMembership?.expiresAt ? new Date(activeMembership.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</Text>
          </View>
        )}

        {/* ── 3. Coupon ── */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Offers & Coupons (Optional)</Text>
          {appliedCoupon ? (
            <View style={styles.couponRow}>
              <MaterialCommunityIcons name="ticket-percent" size={20} color="#6B21A8" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.infoTitle}>Code &apos;{appliedCoupon.code}&apos; Applied</Text>
                <Text style={styles.infoSub}>Flat ₹{appliedCoupon.discount} instant discount</Text>
              </View>
              <Pressable style={styles.couponBtn} onPress={() => setAppliedCoupon(null)}>
                <Text style={styles.couponBtnText}>REMOVE</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.couponRow}>
              <MaterialCommunityIcons name="ticket-percent" size={20} color="#6B21A8" />
              <TextInput
                style={styles.couponInput}
                value={couponCode}
                onChangeText={setCouponCode}
                placeholder="Enter coupon code"
                placeholderTextColor="#94A3B8"
                autoCapitalize="characters"
              />
              <Pressable
                style={[styles.couponBtn, couponLoading && { opacity: 0.6 }]}
                onPress={applyCoupon}
                disabled={couponLoading}
              >
                {couponLoading
                  ? <ActivityIndicator size="small" color="#6B21A8" />
                  : <Text style={styles.couponBtnText}>APPLY</Text>}
              </Pressable>
            </View>
          )}
        </View>

        {/* ── 4. Special Instructions ── */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Any Instructions for the Expert? (Optional)</Text>
          <TextInput
            style={styles.instructionInput}
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            placeholder="e.g. Call before coming, Beware of dog..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={2}
          />
        </View>

        {/* ── 5. Price Breakdown ── */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Price Details</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Visit Charge</Text>
            <Text style={styles.billValue}>₹{visitCharge}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Labour Charge</Text>
            <Text style={[styles.billValue, isMembershipActive && styles.textGreen]}>
              {isMembershipActive ? "FREE" : `₹${labourCharge}`}
            </Text>
          </View>

          {parsedAddonsTotal > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Add-ons</Text>
              <Text style={styles.billValue}>₹{parsedAddonsTotal}</Text>
            </View>
          )}

          {parsedBrandAddonsTotal > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Extra Services</Text>
              <Text style={styles.billValue}>₹{parsedBrandAddonsTotal}</Text>
            </View>
          )}

          <View style={styles.billRow}>
            <View>
              <Text style={styles.billLabel}>Material Cost</Text>
              <Text style={{ fontSize: 10, color: "#64748B", marginTop: 2 }}>Company at MRP or bring your own</Text>
            </View>
            <Text style={styles.billValue}>Extra (if any)</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>GST (18%)</Text>
            <Text style={styles.billValue}>₹{priceBreakdown.gst}</Text>
          </View>

          {appliedCoupon && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Coupon Discount ({appliedCoupon.code})</Text>
              <Text style={[styles.billValue, styles.textGreen]}>- ₹{appliedCoupon.discount}</Text>
            </View>
          )}

          {isMembershipActive && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Membership Discount</Text>
              <Text style={[styles.billValue, styles.textGreen]}>- ₹{priceBreakdown.membershipSaving}</Text>
            </View>
          )}

          {/* Wallet Toggle */}
          <View style={[styles.billRow, { alignItems: 'center', marginTop: 4 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.billLabel}>Wallet Balance (₹{walletBalance})</Text>
              {useWallet && <Text style={styles.walletNote}>₹{priceBreakdown.walletUsed} will be deducted</Text>}
            </View>
            <Switch
              value={useWallet}
              onValueChange={setUseWallet}
              trackColor={{ false: '#CBD5E1', true: '#00A651' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.divider} />

          <View style={[styles.billRow, { marginBottom: 0 }]}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{priceBreakdown.totalPayable}</Text>
          </View>

          {isMembershipActive && (
            <View style={styles.savingBanner}>
              <MaterialCommunityIcons name="tag" size={14} color="#166534" />
              <Text style={styles.savingBannerText}>
                You Save ₹{priceBreakdown.membershipSaving + (appliedCoupon?.discount ?? 0)} on this booking!
              </Text>
            </View>
          )}
        </View>

        {/* ── 5. Terms ── */}
        <View style={{ paddingHorizontal: 20, marginTop: 4 }}>
          <Text style={styles.termsText}>
            ☑ I agree to the{' '}
            <Text style={{ color: '#6B21A8', fontWeight: '700' }}>Terms & Conditions</Text>
            {' '}and{' '}
            <Text style={{ color: '#6B21A8', fontWeight: '700' }}>Privacy Policy</Text>
          </Text>
        </View>

      </ScrollView>

      {/* ── Bottom Bar ── */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.finalPrice}>₹{priceBreakdown.totalPayable}</Text>
          <Text style={styles.priceSubText}>+ Parts if any{isMembershipActive ? ' · Membership Active' : ''}</Text>
        </View>
        <Pressable
          style={[styles.payBtn, submitting && { opacity: 0.7 }]}
          onPress={handlePlaceBooking}
          disabled={submitting}
        >
          {submitting
            ? <ActivityIndicator color="#FFF" />
            : (
              <>
                <Text style={styles.payBtnText}>Book Now</Text>
                <Ionicons name="shield-checkmark" size={16} color="#FFF" style={{ marginLeft: 6 }} />
              </>
            )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Types
interface StylesheetInterface {
  container: ViewStyle; header: ViewStyle; backBtn: ViewStyle; headerTitle: TextStyle;
  card: ViewStyle; sectionHeader: ViewStyle; sectionHeading: TextStyle; editActionText: TextStyle;
  summaryRow: ViewStyle; summaryLabel: TextStyle; summaryValue: TextStyle;
  infoTitle: TextStyle; infoSub: TextStyle;
  membershipCard: ViewStyle; membershipTitle: TextStyle; membershipSub: TextStyle;
  freeBadge: ViewStyle; freeBadgeText: TextStyle;
  couponRow: ViewStyle; couponInput: TextStyle; couponBtn: ViewStyle; couponBtnText: TextStyle;
  instructionInput: TextStyle;
  billRow: ViewStyle; billLabel: TextStyle; billValue: TextStyle; textGreen: TextStyle;
  walletNote: TextStyle; divider: ViewStyle; totalLabel: TextStyle; totalValue: TextStyle;
  savingBanner: ViewStyle; savingBannerText: TextStyle; termsText: TextStyle;
  bottomBar: ViewStyle; finalPrice: TextStyle; priceSubText: TextStyle;
  payBtn: ViewStyle; payBtnText: TextStyle;
}

const styles: StylesheetInterface = StyleSheet.create<StylesheetInterface>({
  container: { flex: 1, backgroundColor: "#F8FAFC", maxWidth: Platform.OS === "web" ? 500 : ("100%" as any), width: "100%", alignSelf: "center" },
  header: { height: 60, backgroundColor: "#FFF", paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#E2E8F0" },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#0F172A" },

  card: { backgroundColor: "#fff", marginHorizontal: 16, marginTop: 14, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#E2E8F0" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionHeading: { fontSize: 14, fontWeight: "900", color: "#0F172A", letterSpacing: 0.2 },
  editActionText: { color: "#6B21A8", fontWeight: "800", fontSize: 13 },

  summaryRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12 },
  summaryLabel: { fontSize: 11, color: "#94A3B8", fontWeight: "600" },
  summaryValue: { fontSize: 14, fontWeight: "700", color: "#1E293B", marginTop: 2 },

  infoTitle: { fontSize: 14, fontWeight: "800", color: "#1E293B" },
  infoSub: { fontSize: 12, color: "#64748B", marginTop: 2, fontWeight: "500" },

  membershipCard: { backgroundColor: "#FEFCE8", borderColor: "#FEF08A" },
  membershipTitle: { fontSize: 14, fontWeight: "800", color: "#854D0E" },
  membershipSub: { fontSize: 11, color: "#A16207", marginTop: 6, fontWeight: "600" },
  freeBadge: { backgroundColor: "#00A651", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  freeBadgeText: { color: "#FFF", fontSize: 10, fontWeight: "900" },

  couponRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 },
  couponInput: { flex: 1, height: 38, borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 10, paddingHorizontal: 12, fontSize: 13, fontWeight: "700", color: "#0F172A", backgroundColor: "#F8FAFC" },
  couponBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, backgroundColor: "#F3E8FF" },
  couponBtnText: { color: "#6B21A8", fontSize: 12, fontWeight: "900" },
  
  instructionInput: { height: 60, borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 12, paddingTop: 10, fontSize: 13, color: "#0F172A", backgroundColor: "#F8FAFC", textAlignVertical: "top", marginTop: 8 },

  billRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  billLabel: { fontSize: 13, color: "#475569", fontWeight: "600" },
  billValue: { fontSize: 13, color: "#0F172A", fontWeight: "700" },
  textGreen: { color: "#00A651", fontWeight: "800" },
  walletNote: { fontSize: 10, color: "#64748B", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 14 },
  totalLabel: { fontSize: 15, fontWeight: "900", color: "#0F172A" },
  totalValue: { fontSize: 20, fontWeight: "900", color: "#0F172A" },

  savingBanner: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#DCFCE7", padding: 10, borderRadius: 10, marginTop: 10 },
  savingBannerText: { fontSize: 12, color: "#166534", fontWeight: "700" },
  termsText: { fontSize: 12, color: "#64748B", fontWeight: "500" },

  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 14, paddingBottom: Platform.OS === "ios" ? 32 : 20, borderTopWidth: 1, borderColor: "#E2E8F0", flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 10, maxWidth: Platform.OS === "web" ? 500 : ("100%" as any), width: "100%", alignSelf: "center" },
  finalPrice: { fontSize: 24, fontWeight: "900", color: "#0F172A" },
  priceSubText: { fontSize: 10, color: "#94A3B8", fontWeight: "600", marginTop: 2 },
  payBtn: { backgroundColor: "#00A651", paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14, flexDirection: "row", alignItems: "center", elevation: 2 },
  payBtnText: { color: "#fff", fontWeight: "900", fontSize: 15 },
});