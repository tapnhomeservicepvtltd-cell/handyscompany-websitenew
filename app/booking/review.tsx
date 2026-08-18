import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from "react";
import {
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";

// स्थानीय फीडबैक टैग्स Tier-2/3 शहरों के अनुसार
const FEEDBACK_TAGS = [
  "समय पर आए (Punctual)",
  "सफाई बहुत बढ़िया थी (Hygienic)",
  "व्यवहार अच्छा था (Polite)",
  "मक्खन जैसी सर्विस (Smooth)",
  "सही दाम, बढ़िया काम",
];

import { createReview } from "../../services/api/reviews";

export default function ReviewScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  // --- States ---
  const [rating, setRating] = useState<number>(5); // Default 5-star
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const fullComment = selectedTags.length > 0
        ? `[Tags: ${selectedTags.join(", ")}] ${comment}`.trim()
        : comment;

      if (bookingId) {
        await createReview(bookingId, rating, fullComment);
      }
      alert("Thank you for your valuable feedback!");
      router.replace("/(tabs)");
    } catch (err: any) {
      // If review already exists or error occurs, show thank you and navigate
      router.replace("/(tabs)");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>Service Feedback</Text>
        <Pressable onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* 🎉 1. Completion Banner */}
        <View style={styles.successCard}>
          <View style={styles.checkCircle}>
            <Ionicons name="sparkles" size={32} color="#FFF" />
          </View>
          <Text style={styles.successTitle}>Service Completed!</Text>
          <Text style={styles.successSub}>Thank you for choosing HandysCompany.</Text>
        </View>

        {/* 👷 2. Expert Profile Details */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop" }} 
              style={styles.avatar} 
            />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.expertName}>Priya Sharma</Text>
              <Text style={styles.roleText}>Your Professional Beautician</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* ⭐ Interactive Star Rating Row */}
          <Text style={styles.ratingLabel}>Rate her service</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => setRating(star)}>
                <Ionicons 
                  name={star <= rating ? "star" : "star-outline"} 
                  size={36} 
                  color="#FBBF24" 
                  style={{ marginHorizontal: 4 }}
                />
              </Pressable>
            ))}
          </View>

          {/* 🏷️ Localized Quick Tags Selector */}
          <Text style={styles.subHeading}>What did you love the most?</Text>
          <View style={styles.tagWrap}>
            {FEEDBACK_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <Pressable
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  style={[styles.tagChip, isSelected && styles.activeTagChip]}
                >
                  <Text style={[styles.tagText, isSelected && styles.textWhite]}>{tag}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* 💵 3. Appreciative Tipping Box (Urban Company Premium Setup) */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Add a Tip for Priya</Text>
          <Text style={styles.sectionSub}>100% of the tip goes directly to the professional&apos;s pocket.</Text>
          
          <View style={styles.tipRow}>
            {[20, 30, 50, 100].map((amount) => {
              const isSelected = tipAmount === amount;
              return (
                <Pressable
                  key={amount}
                  onPress={() => setTipAmount(isSelected ? 0 : amount)}
                  style={[styles.tipChip, isSelected && styles.activeTipChip]}
                >
                  <Text style={[styles.tipText, isSelected && styles.textWhite]}>+ ₹{amount}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* 💬 4. Detailed Comment Feedback box */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Write a Review</Text>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="अपना अनुभव शेयर करें (जैसे: काम बहुत बढ़िया था...)"
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </View>

      </ScrollView>

      {/* 🟢 Bottom Fixed Navigation CTA */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.submitBtn} onPress={handleSubmit} disabled={submitting}>
          <Text style={styles.submitBtnText}>{submitting ? "Submitting..." : "Submit Feedback"}</Text>
          <Ionicons name="checkmark-circle" size={20} color="#fff" style={{ marginLeft: 6 }} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// 📐 Explicit Interface Types to completely eliminate TypeScript style overload issues
interface StylesheetInterface {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  skipText: TextStyle;
  successCard: ViewStyle;
  checkCircle: ViewStyle;
  successTitle: TextStyle;
  successSub: TextStyle;
  card: ViewStyle;
  profileRow: ViewStyle;
  avatar: any;
  expertName: TextStyle;
  roleText: TextStyle;
  divider: ViewStyle;
  ratingLabel: TextStyle;
  starRow: ViewStyle;
  subHeading: TextStyle;
  tagWrap: ViewStyle;
  tagChip: ViewStyle;
  activeTagChip: ViewStyle;
  tagText: TextStyle;
  textWhite: TextStyle;
  sectionHeading: TextStyle;
  sectionSub: TextStyle;
  tipRow: ViewStyle;
  tipChip: ViewStyle;
  activeTipChip: ViewStyle;
  tipText: TextStyle;
  textArea: TextStyle;
  bottomBar: ViewStyle;
  submitBtn: ViewStyle;
  submitBtnText: TextStyle;
}

const styles: StylesheetInterface = StyleSheet.create<StylesheetInterface>({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { height: 60, backgroundColor: "#FFF", paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#E2E8F0", paddingTop: 10 },
  headerTitle: { fontSize: 16, fontWeight: "900", color: "#0F172A" },
  skipText: { color: "#64748B", fontSize: 14, fontWeight: "700" },
  
  successCard: { alignItems: "center", paddingVertical: 24, backgroundColor: "#FFF", borderBottomWidth: 1, borderColor: "#E2E8F0" },
  checkCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#00A651", justifyContent: "center", alignItems: "center" },
  successTitle: { fontSize: 22, fontWeight: "900", color: "#0F172A", marginTop: 12 },
  successSub: { fontSize: 13, color: "#64748B", marginTop: 4, fontWeight: "500" },
  
  card: { backgroundColor: "#fff", marginHorizontal: 16, marginTop: 14, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#E2E8F0" },
  profileRow: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#CBD5E1" },
  expertName: { fontSize: 15, fontWeight: "800", color: "#0F172A" },
  roleText: { fontSize: 12, color: "#64748B", marginTop: 2, fontWeight: "500" },
  
  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 14 },
  ratingLabel: { fontSize: 14, fontWeight: "800", color: "#1E293B", textAlign: "center", marginBottom: 8 },
  starRow: { flexDirection: "row", justifyContent: "center", marginBottom: 14 },
  
  subHeading: { fontSize: 13, fontWeight: "800", color: "#475569", marginTop: 8, marginBottom: 10 },
  tagWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tagChip: { backgroundColor: "#F1F5F9", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#E2E8F0" },
  activeTagChip: { backgroundColor: "#00A651", borderColor: "#00A651" },
  tagText: { fontSize: 12, fontWeight: "700", color: "#475569" },
  textWhite: { color: "#FFF" },
  
  sectionHeading: { fontSize: 14, fontWeight: "900", color: "#0F172A", letterSpacing: 0.2 },
  sectionSub: { fontSize: 11, color: "#64748B", marginTop: 2, marginBottom: 14, fontWeight: "500" },
  
  tipRow: { flexDirection: "row", justifyContent: "space-between", gap: 6 },
  tipChip: { flex: 1, backgroundColor: "#FFF", paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: "#E2E8F0", alignItems: "center" },
  activeTipChip: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  tipText: { fontSize: 12, fontWeight: "800", color: "#0F172A" },
  
  textArea: { borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 14, padding: 12, fontSize: 13, color: "#1E293B", backgroundColor: "#F8FAFC", minHeight: 80, textAlignVertical: "top", fontWeight: "600", marginTop: 10 },
  
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 14, paddingBottom: Platform.OS === "ios" ? 32 : 20, borderTopWidth: 1, borderColor: "#E2E8F0" },
  submitBtn: { backgroundColor: "#00A651", height: 50, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", elevation: 2 },
  submitBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
});