import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────
type Part = {
  id: string;
  name: string;
  qty: number;
  mrp: number;
  brand?: string;
  approved?: boolean;
};

// ─── Mock parts (in production, fetch from backend using bookingId) ───────
const MOCK_PARTS: Part[] = [
  { id: "p1", name: "Capacitor", qty: 1, mrp: 180, brand: "Havells" },
  { id: "p2", name: "Wire (per meter)", qty: 2, mrp: 90, brand: "Anchor" },
  { id: "p3", name: "Switch", qty: 1, mrp: 120, brand: "Legrand" },
];

export default function MaterialApprovalScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId?: string }>();

  const [parts, setParts] = useState<Part[]>(MOCK_PARTS);
  const [submitting, setSubmitting] = useState(false);
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(null);

  // Toggle individual part approval
  const togglePart = (id: string) => {
    if (decision) return; // locked after submit
    setParts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, approved: !p.approved } : p)),
    );
  };

  const total = parts.reduce((sum, p) => sum + p.mrp * p.qty, 0);
  const approvedTotal = parts
    .filter((p) => p.approved)
    .reduce((sum, p) => sum + p.mrp * p.qty, 0);

  // ── Approve all ──────────────────────────────────────────────────────────
  const handleApprove = () => {
    Alert.alert(
      "Approve Materials?",
      `You are approving parts worth ₹${approvedTotal > 0 ? approvedTotal : total}. This will be added to your final bill.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "✅ Approve",
          onPress: async () => {
            setSubmitting(true);
            // In production: call approveEvidence(bookingId) or a dedicated parts approval endpoint
            await new Promise((r) => setTimeout(r, 1000)); // simulate API
            setDecision("approved");
            setSubmitting(false);
          },
        },
      ],
    );
  };

  // ── Reject all ───────────────────────────────────────────────────────────
  const handleReject = () => {
    Alert.alert(
      "Reject All Materials?",
      "Without your approval, parts cost will NOT be added. The technician will use only what you've pre-selected.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "❌ Reject",
          style: "destructive",
          onPress: async () => {
            setSubmitting(true);
            await new Promise((r) => setTimeout(r, 800));
            setDecision("rejected");
            setSubmitting(false);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerTitle}>Material Approval</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>

        {/* ── Info Banner ── */}
        <View style={styles.infoBanner}>
          <MaterialCommunityIcons name="information-outline" size={18} color="#1D4ED8" />
          <Text style={styles.infoBannerText}>
            Your technician has listed the following parts required for the job.
            Please review and approve or reject them.
          </Text>
        </View>

        {/* ── Decision result ── */}
        {decision && (
          <View style={[styles.resultBanner, decision === "approved" ? styles.resultApproved : styles.resultRejected]}>
            <Ionicons
              name={decision === "approved" ? "checkmark-circle" : "close-circle"}
              size={22}
              color={decision === "approved" ? "#166534" : "#991B1B"}
            />
            <Text style={[styles.resultText, decision === "approved" ? { color: "#166534" } : { color: "#991B1B" }]}>
              {decision === "approved"
                ? `Materials Approved! ₹${approvedTotal > 0 ? approvedTotal : total} will be added to bill.`
                : "Materials Rejected. Parts cost will NOT be added."}
            </Text>
          </View>
        )}

        {/* ── Parts Table ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Parts Added by Technician</Text>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2.5 }]}>Part Name</Text>
            <Text style={[styles.tableHeaderCell, { flex: 0.6, textAlign: "center" }]}>Qty</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1.2, textAlign: "right" }]}>MRP</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: "center" }]}>Select</Text>
          </View>

          {parts.map((part) => (
            <Pressable
              key={part.id}
              onPress={() => togglePart(part.id)}
              style={[styles.partRow, part.approved && styles.partRowSelected]}
            >
              <View style={{ flex: 2.5 }}>
                <Text style={styles.partName}>{part.name}</Text>
                {part.brand && <Text style={styles.partBrand}>{part.brand}</Text>}
              </View>
              <Text style={[styles.partCell, { flex: 0.6, textAlign: "center" }]}>{part.qty}</Text>
              <Text style={[styles.partCell, { flex: 1.2, textAlign: "right", fontWeight: "700" }]}>
                ₹{(part.mrp * part.qty).toLocaleString("en-IN")}
              </Text>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={[styles.checkbox, part.approved && styles.checkboxActive]}>
                  {part.approved && <Ionicons name="checkmark" size={14} color="#fff" />}
                </View>
              </View>
            </Pressable>
          ))}

          {/* Divider + Total */}
          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{total.toLocaleString("en-IN")}</Text>
          </View>

          {parts.some((p) => p.approved) && (
            <View style={styles.selectedTotalRow}>
              <Text style={styles.selectedTotalLabel}>Selected Parts Total</Text>
              <Text style={styles.selectedTotalValue}>₹{approvedTotal.toLocaleString("en-IN")}</Text>
            </View>
          )}
        </View>

        {/* ── Important Note ── */}
        <View style={styles.noteCard}>
          <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#CA8A04" style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.noteText}>
              Without your approval, parts cost will NOT be added to your bill. Original service charges remain unchanged.
            </Text>
            <Text style={[styles.noteText, { marginTop: 6, fontWeight: "700" }]}>
              💡 Tip: You can buy 100% genuine parts from us at MRP, or you can choose to provide your own materials.
            </Text>
          </View>
        </View>

        {/* ── Pricing Context ── */}
        <View style={styles.priceCard}>
          <Text style={styles.priceCardTitle}>Your Bill Breakdown</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Charges</Text>
            <Text style={styles.priceValue}>₹49</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Labour Charge</Text>
            <Text style={[styles.priceValue, { color: "#00A651" }]}>FREE (Membership)</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Parts (if approved)</Text>
            <Text style={styles.priceValue}>₹{total.toLocaleString("en-IN")}</Text>
          </View>
          <View style={[styles.priceRow, { borderTopWidth: 1, borderColor: "#E2E8F0", paddingTop: 8, marginTop: 4 }]}>
            <Text style={[styles.priceLabel, { fontWeight: "900", color: "#0F172A" }]}>Final Total</Text>
            <Text style={[styles.priceValue, { fontSize: 18, fontWeight: "900", color: "#00A651" }]}>
              ₹{(49 + (decision === "approved" ? (approvedTotal > 0 ? approvedTotal : total) : 0)).toLocaleString("en-IN")}
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* ── Bottom Action Buttons (like image) ── */}
      {!decision && (
        <View style={styles.bottomBar}>
          <Pressable
            style={[styles.rejectBtn, submitting && { opacity: 0.6 }]}
            onPress={handleReject}
            disabled={submitting}
          >
            <Ionicons name="close" size={20} color="#EF4444" />
            <Text style={styles.rejectBtnText}>Reject</Text>
          </Pressable>

          <Pressable
            style={[styles.approveBtn, submitting && { opacity: 0.6 }]}
            onPress={handleApprove}
            disabled={submitting}
          >
            <Ionicons name="checkmark" size={20} color="#fff" />
            <Text style={styles.approveBtnText}>Approve</Text>
          </Pressable>
        </View>
      )}

      {/* ── Post-decision CTA ── */}
      {decision && (
        <View style={styles.bottomBar}>
          <Pressable
            style={styles.continueBtn}
            onPress={() => router.push({ pathname: "/booking/review", params: { bookingId } } as any)}
          >
            <Text style={styles.continueBtnText}>Proceed to Review</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { height: 60, backgroundColor: "#FFF", paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#E2E8F0" },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#0F172A" },

  infoBanner: { flexDirection: "row", gap: 10, backgroundColor: "#EFF6FF", padding: 14, margin: 16, borderRadius: 14, alignItems: "flex-start", borderWidth: 1, borderColor: "#BFDBFE" },
  infoBannerText: { flex: 1, fontSize: 13, color: "#1E40AF", lineHeight: 20, fontWeight: "500" },

  resultBanner: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14, marginHorizontal: 16, marginBottom: 8, borderRadius: 14, borderWidth: 1 },
  resultApproved: { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" },
  resultRejected: { backgroundColor: "#FFF1F2", borderColor: "#FECDD3" },
  resultText: { flex: 1, fontSize: 13, fontWeight: "700", lineHeight: 18 },

  card: { backgroundColor: "#fff", marginHorizontal: 16, marginBottom: 14, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#E2E8F0" },
  cardTitle: { fontSize: 15, fontWeight: "900", color: "#0F172A", marginBottom: 14 },

  // Table
  tableHeader: { flexDirection: "row", paddingBottom: 10, borderBottomWidth: 1, borderColor: "#F1F5F9", marginBottom: 4 },
  tableHeaderCell: { fontSize: 11, fontWeight: "800", color: "#94A3B8", letterSpacing: 0.3 },

  partRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderColor: "#F8FAFC", borderRadius: 8 },
  partRowSelected: { backgroundColor: "#F0FDF4" },
  partName: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  partBrand: { fontSize: 11, color: "#64748B", marginTop: 2 },
  partCell: { fontSize: 14, color: "#0F172A" },

  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: "#CBD5E1", alignItems: "center", justifyContent: "center" },
  checkboxActive: { backgroundColor: "#00A651", borderColor: "#00A651" },

  divider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 12 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { fontSize: 15, fontWeight: "900", color: "#0F172A" },
  totalValue: { fontSize: 18, fontWeight: "900", color: "#0F172A" },
  selectedTotalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  selectedTotalLabel: { fontSize: 12, color: "#00A651", fontWeight: "700" },
  selectedTotalValue: { fontSize: 14, color: "#00A651", fontWeight: "900" },

  noteCard: { flexDirection: "row", gap: 10, backgroundColor: "#FEFCE8", padding: 14, marginHorizontal: 16, marginBottom: 14, borderRadius: 14, borderWidth: 1, borderColor: "#FDE68A" },
  noteText: { flex: 1, fontSize: 12, color: "#92400E", lineHeight: 18, fontWeight: "500" },

  priceCard: { backgroundColor: "#F0FDF4", borderRadius: 16, padding: 16, marginHorizontal: 16, marginBottom: 14, borderWidth: 1, borderColor: "#BBF7D0" },
  priceCardTitle: { fontSize: 13, fontWeight: "800", color: "#166534", marginBottom: 12 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  priceLabel: { fontSize: 13, color: "#475569", fontWeight: "600" },
  priceValue: { fontSize: 13, color: "#0F172A", fontWeight: "700" },

  // Bottom buttons (exact like image)
  bottomBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "#fff", paddingHorizontal: 20,
    paddingTop: 14, paddingBottom: Platform.OS === "ios" ? 32 : 20,
    borderTopWidth: 1, borderColor: "#E2E8F0",
    flexDirection: "row", gap: 12, elevation: 10,
  },
  rejectBtn: {
    flex: 1, height: 52, borderRadius: 14, borderWidth: 2, borderColor: "#EF4444",
    justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 6, backgroundColor: "#FFF1F2",
  },
  rejectBtnText: { fontSize: 15, fontWeight: "900", color: "#EF4444" },
  approveBtn: {
    flex: 1.4, height: 52, borderRadius: 14, backgroundColor: "#00A651",
    justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 6, elevation: 2,
  },
  approveBtnText: { fontSize: 15, fontWeight: "900", color: "#FFF" },
  continueBtn: {
    flex: 1, height: 52, borderRadius: 14, backgroundColor: "#00A651",
    justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 8, elevation: 2,
  },
  continueBtnText: { fontSize: 15, fontWeight: "900", color: "#FFF" },
});
