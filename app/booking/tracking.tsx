import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  joinBookingRoom,
  onLocationUpdate,
  onStatusUpdate,
  disconnectSocket,
} from "../../services/socketService";

// Platform-adaptive map component
import AddressMap from "../../components/AddressMap";

const STEP_MAP: Record<string, number> = {
  BOOKING_ACCEPTED: 1,
  TRAVELLING: 1,
  PAUSED: 1,
  ARRIVED: 2,
  OTP_PENDING: 2,
  WORK_STARTED: 3,
  WORK_IN_PROGRESS: 3,
  WORK_COMPLETED: 3,
  INVOICE_GENERATED: 3,
};

const ETA_MAP: Record<string, string> = {
  BOOKING_ACCEPTED: "🛵 Expert accepted — heading to you soon",
  TRAVELLING: "🛵 Expert is on the way",
  PAUSED: "⏸️ Expert paused journey",
  ARRIVED: "📍 Expert has arrived",
  OTP_PENDING: "📍 Expert is at your door — share OTP",
  WORK_STARTED: "🔧 Service in progress",
  WORK_IN_PROGRESS: "🔧 Service in progress",
  WORK_COMPLETED: "✅ Work completed",
  INVOICE_GENERATED: "🧾 Invoice ready",
};

export default function TrackingScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();

  const [trackingStatus, setTrackingStatus] = useState("BOOKING_ACCEPTED");
  const [techLocation, setTechLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatList, setChatList] = useState([
    {
      id: "1",
      sender: "expert",
      text: "Hello! I have accepted your booking. I'll start soon.",
    },
  ]);

  // ─── Setup real WebSocket connection ─────────────────────────────────────
  const setupSocket = useCallback(async () => {
    if (!bookingId) return;

    try {
      await joinBookingRoom(bookingId);
      setIsConnected(true);

      await onLocationUpdate((data) => {
        setTechLocation({ latitude: data.latitude, longitude: data.longitude });
        setTrackingStatus(data.trackingStatus);
        setCurrentStep(STEP_MAP[data.trackingStatus] ?? 1);
      });

      await onStatusUpdate((data) => {
        setTrackingStatus(data.status);
        setCurrentStep(STEP_MAP[data.status] ?? 1);
      });
    } catch (err) {
      console.warn("Socket setup failed:", err);
    }
  }, [bookingId]);

  useEffect(() => {
    setupSocket();
    return () => disconnectSocket();
  }, [setupSocket]);

  // ─── Handlers ────────────────────────────────────────────────────────────
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatList((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text: chatMessage.trim() },
    ]);
    setChatMessage("");
  };

  const handleCancel = () => {
    const isTravelling = ["TRAVELLING", "ARRIVED", "OTP_PENDING"].includes(
      trackingStatus
    );
    Alert.alert(
      "Cancel Booking?",
      isTravelling
        ? "The expert is already on the way. A cancellation fee of ₹49 will be charged. Do you want to proceed?"
        : "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            disconnectSocket();
            router.back();
          },
        },
      ]
    );
  };

  const handleSOS = () => {
    Alert.alert(
      "Emergency Support",
      "Calling HandysCompany 24/7 Safety Line...",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call Now", style: "destructive", onPress: () => {} },
      ]
    );
  };

  // ─── UI ───────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle}>Track Expert</Text>
        {/* Live indicator */}
        <View style={styles.liveChip}>
          <View
            style={[styles.liveDot, { backgroundColor: isConnected ? "#00A651" : "#94A3B8" }]}
          />
          <Text style={[styles.liveText, { color: isConnected ? "#00A651" : "#94A3B8" }]}>
            {isConnected ? "LIVE" : "..."}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* 🗺️ Map */}
        <View style={styles.mapWrap}>
          {Platform.OS === "web" ? (
            <View style={{ flex: 1 }}>
              {/* @ts-ignore */}
              <iframe
                src="https://maps.google.com/maps?q=Gaya&z=14&output=embed"
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            </View>
          ) : (
            <AddressMap onLocationChange={() => {}} />
          )}
        </View>

        {/* Live location banner */}
        {techLocation && (
          <View style={styles.locationBanner}>
            <Ionicons name="navigate" size={14} color="#00A651" />
            <Text style={styles.locationBannerText}>
              Expert at {techLocation.latitude.toFixed(4)},{" "}
              {techLocation.longitude.toFixed(4)}
            </Text>
          </View>
        )}

        {/* 👷 Professional Card */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop",
              }}
              style={styles.avatar}
            />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <View style={styles.nameRow}>
                <Text style={styles.expertName}>Priya Sharma</Text>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={10} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.9</Text>
                </View>
              </View>
              <Text style={styles.techStats}>ID: HC-9824 • 142 Jobs Done</Text>
              <Text style={styles.techStats}>Vehicle: Honda Activa (BR01XX1234)</Text>
              <Text style={styles.etaText}>
                {ETA_MAP[trackingStatus] ?? "🛵 Arriving soon"}
              </Text>
            </View>
            <Pressable
              style={styles.callBtn}
              onPress={() => alert("Calling Priya Sharma...")}
            >
              <Ionicons name="call" size={20} color="#00A651" />
            </Pressable>
          </View>
        </View>

        {/* 📉 Progress Stepper */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Service Progress</Text>

          {[
            { label: "Expert Started", sub: "Expert accepted and is heading to you." },
            { label: "Reached Location", sub: "Expert has arrived at your doorstep." },
            { label: "Service Started", sub: "Relax and enjoy your professional setup." },
          ].map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep >= stepNum;
            const isLast = idx === 2;
            return (
              <View
                key={stepNum}
                style={[styles.stepRow, isLast && { marginBottom: 0 }]}
              >
                <View style={styles.stepIndicatorColumn}>
                  <View
                    style={[styles.stepCircle, isActive && styles.stepCircleActive]}
                  >
                    {isActive && (
                      <Ionicons name="checkmark" size={12} color="#FFF" />
                    )}
                  </View>
                  {!isLast && (
                    <View
                      style={[
                        styles.stepLine,
                        currentStep > stepNum && styles.stepLineActive,
                      ]}
                    />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text
                    style={[styles.stepTitle, isActive && styles.textActive]}
                  >
                    {step.label}
                  </Text>
                  <Text style={styles.stepSub}>{step.sub}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* 💬 Chat */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Chat with Expert</Text>
          <View style={styles.chatBox}>
            {chatList.map((chat) => (
              <View
                key={chat.id}
                style={[
                  styles.chatBubble,
                  chat.sender === "user"
                    ? styles.chatBubbleUser
                    : styles.chatBubbleExpert,
                ]}
              >
                <Text
                  style={[
                    styles.chatText,
                    chat.sender === "user" ? styles.textWhite : styles.textBlack,
                  ]}
                >
                  {chat.text}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.inputRow}>
            <TextInput
              value={chatMessage}
              onChangeText={setChatMessage}
              placeholder="Type a message for expert..."
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />
            <Pressable style={styles.sendBtn} onPress={handleSendMessage}>
              <Ionicons name="send" size={18} color="#FFF" />
            </Pressable>
          </View>
        </View>

        {/* 🆘 Safety & Cancellation */}
        <View style={styles.actionCard}>
          <Pressable style={styles.sosBtn} onPress={handleSOS}>
            <MaterialCommunityIcons name="shield-alert" size={24} color="#DC2626" />
            <Text style={styles.sosText}>SOS / Emergency Support</Text>
          </Pressable>
          <Pressable style={styles.cancelBtn} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel Booking</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface StylesheetInterface {
  container: ViewStyle;
  header: ViewStyle;
  backBtn: ViewStyle;
  headerTitle: TextStyle;
  liveChip: ViewStyle;
  liveDot: ViewStyle;
  liveText: TextStyle;
  mapWrap: ViewStyle;
  locationBanner: ViewStyle;
  locationBannerText: TextStyle;
  card: ViewStyle;
  profileRow: ViewStyle;
  avatar: any;
  nameRow: ViewStyle;
  ratingBadge: ViewStyle;
  ratingText: TextStyle;
  expertName: TextStyle;
  etaText: TextStyle;
  techStats: TextStyle;
  callBtn: ViewStyle;
  sectionHeading: TextStyle;
  stepRow: ViewStyle;
  stepIndicatorColumn: ViewStyle;
  stepCircle: ViewStyle;
  stepCircleActive: ViewStyle;
  stepLine: ViewStyle;
  stepLineActive: ViewStyle;
  stepContent: ViewStyle;
  stepTitle: TextStyle;
  stepSub: TextStyle;
  textActive: TextStyle;
  chatBox: ViewStyle;
  chatBubble: ViewStyle;
  chatBubbleUser: ViewStyle;
  chatBubbleExpert: ViewStyle;
  chatText: TextStyle;
  textWhite: TextStyle;
  textBlack: TextStyle;
  inputRow: ViewStyle;
  input: TextStyle;
  sendBtn: ViewStyle;
  actionCard: ViewStyle;
  sosBtn: ViewStyle;
  sosText: TextStyle;
  cancelBtn: ViewStyle;
  cancelText: TextStyle;
}

const styles: StylesheetInterface = StyleSheet.create<StylesheetInterface>({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { height: 60, backgroundColor: "#FFF", paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#E2E8F0", paddingTop: 10 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#0F172A" },
  liveChip: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, backgroundColor: "#F0FDF4", borderWidth: 1, borderColor: "#BBF7D0" },
  liveDot: { width: 7, height: 7, borderRadius: 4 },
  liveText: { fontSize: 10, fontWeight: "900", letterSpacing: 0.5 },
  mapWrap: { height: 260, backgroundColor: "#E2E8F0", overflow: "hidden" },
  locationBanner: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#F0FDF4", borderBottomWidth: 1, borderColor: "#BBF7D0" },
  locationBannerText: { fontSize: 12, fontWeight: "700", color: "#15803D" },
  card: { backgroundColor: "#fff", marginHorizontal: 16, marginTop: 14, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#E2E8F0" },
  profileRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#CBD5E1" },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  ratingBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#FEF3C7", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, gap: 2 },
  ratingText: { fontSize: 11, fontWeight: "800", color: "#B45309" },
  expertName: { fontSize: 15, fontWeight: "800", color: "#0F172A" },
  etaText: { fontSize: 13, color: "#00A651", fontWeight: "700", marginTop: 4 },
  techStats: { fontSize: 11, color: "#64748B", fontWeight: "600", marginTop: 2 },
  callBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#E6F6ED", justifyContent: "center", alignItems: "center" },
  sectionHeading: { fontSize: 14, fontWeight: "900", color: "#0F172A", marginBottom: 16, letterSpacing: 0.2 },
  stepRow: { flexDirection: "row", marginBottom: 16 },
  stepIndicatorColumn: { alignItems: "center", marginRight: 14, width: 16 },
  stepCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: "#E2E8F0", justifyContent: "center", alignItems: "center" },
  stepCircleActive: { backgroundColor: "#00A651" },
  stepLine: { width: 2, flex: 1, backgroundColor: "#E2E8F0" },
  stepLineActive: { backgroundColor: "#00A651" },
  stepContent: { flex: 1, marginTop: -2 },
  stepTitle: { fontSize: 14, fontWeight: "700", color: "#64748B" },
  stepSub: { fontSize: 12, color: "#94A3B8", marginTop: 3, fontWeight: "500", lineHeight: 16 },
  textActive: { color: "#0F172A", fontWeight: "800" },
  chatBox: { minHeight: 100, backgroundColor: "#F8FAFC", borderRadius: 14, padding: 12, gap: 8, borderWidth: 1, borderColor: "#F1F5F9" },
  chatBubble: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, maxWidth: "85%" },
  chatBubbleUser: { backgroundColor: "#00A651", alignSelf: "flex-end" },
  chatBubbleExpert: { backgroundColor: "#E2E8F0", alignSelf: "flex-start" },
  chatText: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
  textWhite: { color: "#FFF" },
  textBlack: { color: "#1E293B" },
  inputRow: { flexDirection: "row", marginTop: 12, gap: 8, alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 14, height: 44, paddingHorizontal: 14, fontSize: 13, color: "#1E293B", backgroundColor: "#F8FAFC", fontWeight: "600" },
  sendBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: "#00A651", justifyContent: "center", alignItems: "center" },
  actionCard: { marginHorizontal: 16, marginTop: 14, gap: 12 },
  sosBtn: { flexDirection: "row", backgroundColor: "#FEF2F2", padding: 14, borderRadius: 16, alignItems: "center", justifyContent: "center", gap: 8, borderWidth: 1, borderColor: "#FECACA" },
  sosText: { color: "#DC2626", fontSize: 14, fontWeight: "800" },
  cancelBtn: { padding: 14, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  cancelText: { color: "#64748B", fontSize: 14, fontWeight: "700" },
});