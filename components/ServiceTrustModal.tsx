import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useLang } from "../app/context/LanguageContext";

const { height } = Dimensions.get("window");

interface ServiceTrustModalProps {
  isVisible: boolean;
  onClose: () => void;
  ratingDistribution?: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
}

export default function ServiceTrustModal({
  isVisible,
  onClose,
  ratingDistribution = { five: 34000, four: 606, three: 342, two: 193, one: 287 }
}: ServiceTrustModalProps) {
  const { t } = useLang();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "85%"], []);

  // compute max for bar width calculations
  const maxRatingValue = useMemo(() => {
    const vals = [
      ratingDistribution.five,
      ratingDistribution.four,
      ratingDistribution.three,
      ratingDistribution.two,
      ratingDistribution.one,
    ];
    return Math.max(...vals, 0);
  }, [ratingDistribution]);

  const getPercentage = (val: number) => {
    if (maxRatingValue <= 0) return 0;
    return (val / maxRatingValue) * 100;
  };

  // 🌟 FULL-PROOF TRIGGER: State change hote hi instantly open/close command fire karega
  useEffect(() => {
    if (isVisible) {
      sheetRef.current?.snapToIndex(1); // Force snap to 85% view like UC
    } else {
      sheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1} // Hamesha hidden start hoga jab tak isVisible true na ho
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.indicator}
      backdropComponent={(props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.5}
        />
      )}
    >
      <BottomSheetView style={styles.modalContainer}>
        {/* Sticky Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("Service Insights", "सर्विस की जानकारी")}</Text>
          <TouchableOpacity onPress={() => sheetRef.current?.close()} style={styles.closeButton}>
            <Ionicons name="close" size={18} color="#1E293B" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          {/* ⚡ 1. AFTERCARE TIPS */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>{t("Aftercare tips", "सर्विस के बाद सावधानियां")}</Text>
            <View style={styles.bulletRow}>
              <MaterialCommunityIcons name="circle" size={6} color="#475569" style={styles.bulletDot} />
              <Text style={styles.bulletText}>{t("Moisturise your skin for a soothing effect", "त्वचा को शांत रखने के लिए मॉइस्चराइजर लगाएं")}</Text>
            </View>
            <View style={styles.bulletRow}>
              <MaterialCommunityIcons name="circle" size={6} color="#475569" style={styles.bulletDot} />
              <Text style={styles.bulletText}>{t("Avoid using chemical products like perfumes or scrubs for 2-3 hours", "2-3 घंटे तक परफ्यूम या स्क्रब जैसे केमिकल प्रोडक्ट्स से बचें")}</Text>
            </View>
          </View>

          <View style={styles.thinDivider} />

          {/* ⚡ 2. PLEASE NOTE */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>{t("Please note", "ध्यान दें")}</Text>
            <View style={styles.bulletRow}>
              <MaterialCommunityIcons name="circle" size={6} color="#475569" style={styles.bulletDot} />
              <Text style={styles.bulletText}>{t("Waxing in an AC room is recommended", "AC वाले कमरे में वैक्सिंग कराने की सलाह दी जाती है")}</Text>
            </View>
          </View>

          {/* ⚡ 3. TRUSTED BANNER */}
          <View style={styles.trustBanner}>
            <View style={styles.trustInfo}>
              <Text style={styles.trustHeading}>Trusted by 5M+ women</Text>
              <Text style={styles.trustSubheading}>across regions</Text>
            </View>
            <Image source={{ uri: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=150" }} style={styles.expertImage} />
          </View>

          {/* ⚡ 4. RATING GRAPH */}
          <View style={styles.ratingSection}>
            <View style={styles.ratingSummary}>
              <Text style={styles.ratingBigNumber}>4.89 ★</Text>
              <Text style={styles.ratingTotalCount}>35K reviews</Text>
            </View>
            <View style={styles.graphContainer}>
              {[
                { label: "5", val: ratingDistribution.five },
                { label: "4", val: ratingDistribution.four },
                { label: "3", val: ratingDistribution.three },
                { label: "2", val: ratingDistribution.two },
                { label: "1", val: ratingDistribution.one },
              ].map((bar, idx) => (
                <View key={idx} style={styles.graphRow}>
                  <Text style={styles.starLabel}>{bar.label}</Text>
                  <View style={styles.barBackground}>
                    <View style={[styles.barFill, { width: `${getPercentage(bar.val)}%` }]} />
                  </View>
                  <Text style={styles.barCount}>{bar.val >= 1000 ? `${(bar.val / 1000).toFixed(0)}k` : bar.val}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: { borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: "#FFFFFF" },
  indicator: { backgroundColor: "#E2E8F0", width: 36, height: 4 },
  modalContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14 },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#0F172A" },
  closeButton: { backgroundColor: "#F1F5F9", padding: 6, borderRadius: 20 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 60 },
  sectionBox: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#0F172A", marginBottom: 12 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10, paddingRight: 10 },
  bulletDot: { marginTop: 6, marginRight: 10 },
  bulletText: { fontSize: 13.5, color: "#334155", lineHeight: 19, fontWeight: "500" },
  thinDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 14 },
  trustBanner: { flexDirection: "row", backgroundColor: "#F8FAFC", borderRadius: 16, padding: 16, alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#E2E8F0", marginBottom: 24 },
  trustInfo: { flex: 1 },
  trustHeading: { fontSize: 15, fontWeight: "800", color: "#0F172A" },
  trustSubheading: { fontSize: 14, color: "#475569", fontWeight: "600", marginBottom: 10 },
  expertImage: { width: 70, height: 70, borderRadius: 12, backgroundColor: "#E2E8F0", marginLeft: 10 },
  ratingSection: { flexDirection: "row", alignItems: "center", gap: 20, marginBottom: 20 },
  ratingSummary: { alignItems: "center", justifyContent: "center", width: 75 },
  ratingBigNumber: { fontSize: 22, fontWeight: "900", color: "#0F172A" },
  ratingTotalCount: { fontSize: 11, color: "#64748B", fontWeight: "600", marginTop: 2 },
  graphContainer: { flex: 1, gap: 5 },
  graphRow: { flexDirection: "row", alignItems: "center" },
  starLabel: { fontSize: 12, fontWeight: "700", color: "#64748B", width: 12 },
  barBackground: { flex: 1, height: 5, backgroundColor: "#F1F5F9", borderRadius: 3, marginHorizontal: 8, overflow: "hidden" },
  barFill: { height: "100%", backgroundColor: "#4F46E5", borderRadius: 3 },
  barCount: { fontSize: 11, color: "#64748B", fontWeight: "600", width: 32, textAlign: "right" },
});