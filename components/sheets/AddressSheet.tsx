import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

interface AddressSheetProps {
  onAddressSave?: (addressData: any) => void;
}

const AddressSheet = forwardRef<BottomSheet, AddressSheetProps>(({ onAddressSave }, ref) => {
  // अर्बन कंपनी स्टाइल में 2 स्नैप पॉइंट्स (हाफ स्क्रीन और फुल स्क्रीन)
  const snapPoints = useMemo(() => ["65%", "90%"], []);

  // --- States ---
  const [addressType, setAddressType] = useState<"Home" | "Other">("Home");
  const [flatNumber, setFlatNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  
  // बिहार-झारखंड के टाउन के हिसाब से लाइव डिटेक्टेड एड्रेस
  const [detectedAddress] = useState(
    "Patna Junction, Fraser Road Area, Old Jakkanpur, Patna, Bihar 800001"
  );

  // बैकड्रॉप (पीछे का डार्क ओवरले) ताकि लुक प्रीमियम आए
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.sheetContent}>
        
        {/* 🗺️ INTERACTIVE MAP AREA */}
        <View style={styles.mapContainer}>
          {Platform.OS === "web" ? (
            // 🌐 WEB: बिना क्रैश होने वाला iframe मैप
            <iframe
              src="https://maps.google.com/maps?q=25.6026,85.1196&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 16 }}
              loading="lazy"
            />
          ) : (
            // 📱 MOBILE: मोबाइल का डमी मैप व्यू
            <View style={styles.mobileMapPlaceholder}>
              <MaterialCommunityIcons name="map-marker-radius" size={38} color="#00A651" />
              <Text style={styles.mobileMapText}>Interactive Map Loading...</Text>
            </View>
          )}

          {/* 📍 CENTER PIN OVERLAY (Urban Company Style Pin) */}
          <View style={styles.pinOverlay} pointerEvents="none">
            <MaterialCommunityIcons name="map-marker" size={36} color="#EC4899" />
            <View style={styles.pinShadow} />
          </View>
        </View>

        {/* 📋 ADDRESS FORM CONTAINER */}
        <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionHeading}>Confirm Service Location</Text>
          
          {/* Live Location Box */}
          <View style={styles.detectedBox}>
            <MaterialCommunityIcons name="map-marker-check" size={20} color="#00A651" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.detectedTitle}>Grooming Location</Text>
              <Text style={styles.detectedText} numberOfLines={2}>{detectedAddress}</Text>
            </View>
          </View>

          {/* House/Flat Input */}
          <Text style={styles.inputLabel}>HOUSE / FLAT / BLOCK NO.</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Flat 402, Shivani Apartment"
            placeholderTextColor="#94A3B8"
            value={flatNumber}
            onChangeText={setFlatNumber}
          />

          {/* Landmark Input */}
          <Text style={styles.inputLabel}>LANDMARK (OPTIONAL)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Near Mahavir Mandir"
            placeholderTextColor="#94A3B8"
            value={landmark}
            onChangeText={setLandmark}
          />

          {/* Address Type Buttons */}
          <Text style={styles.inputLabel}>SAVE ADDRESS AS</Text>
          <View style={styles.typeRow}>
            <Pressable
              style={[styles.typePill, addressType === "Home" && styles.typePillActive]}
              onPress={() => setAddressType("Home")}
            >
              <MaterialCommunityIcons 
                name="home-outline" 
                size={18} 
                color={addressType === "Home" ? "#fff" : "#475569"} 
              />
              <Text style={[styles.typeText, addressType === "Home" && styles.typeTextActive]}>Home</Text>
            </Pressable>

            <Pressable
              style={[styles.typePill, addressType === "Other" && styles.typePillActive]}
              onPress={() => setAddressType("Other")}
            >
              <MaterialCommunityIcons 
                name="briefcase-outline" 
                size={18} 
                color={addressType === "Other" ? "#fff" : "#475569"} 
              />
              <Text style={[styles.typeText, addressType === "Other" && styles.typeTextActive]}>Other</Text>
            </Pressable>
          </View>

          {/* Save & Proceed Action Button */}
          <Pressable
            style={[styles.saveBtn, !flatNumber && styles.saveBtnDisabled]}
            disabled={!flatNumber}
            onPress={() => {
              if (onAddressSave) {
                onAddressSave({ flatNumber, landmark, addressType, detectedAddress });
              }
              (ref as any).current?.close();
            }}
          >
            <Text style={styles.saveBtnText}>Save and Proceed to Slots</Text>
          </Pressable>
        </ScrollView>

      </BottomSheetView>
    </BottomSheet>
  );
});

AddressSheet.displayName = 'AddressSheet';
export default AddressSheet;

const styles = StyleSheet.create({
  sheetContent: { flex: 1, backgroundColor: "#FFF" },
  mapContainer: { height: 160, marginHorizontal: 16, marginTop: 8, borderRadius: 16, overflow: "hidden", backgroundColor: "#F1F5F9", position: "relative" },
  mobileMapPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center", gap: 6 },
  mobileMapText: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  pinOverlay: { position: "absolute", top: "35%", left: "47%", alignItems: "center" },
  pinShadow: { width: 8, height: 4, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 4, marginTop: -2 },
  formContainer: { padding: 18, paddingBottom: 40 },
  sectionHeading: { fontSize: 18, fontWeight: "900", color: "#0F172A", marginBottom: 12 },
  detectedBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAFC", padding: 12, borderRadius: 12, borderWidth: 1, borderColor: "#E2E8F0", marginBottom: 12 },
  detectedTitle: { fontSize: 11, color: "#64748B", fontWeight: "700" },
  detectedText: { fontSize: 13, color: "#1E293B", fontWeight: "600", marginTop: 2 },
  inputLabel: { fontSize: 11, fontWeight: "800", color: "#64748B", marginTop: 12, marginBottom: 6, letterSpacing: 0.5 },
  input: { borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, height: 48, paddingHorizontal: 14, fontSize: 14, color: "#1E293B", backgroundColor: "#FFF", fontWeight: "600" },
  typeRow: { flexDirection: "row", gap: 10, marginTop: 4, marginBottom: 20 },
  typePill: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: "#E2E8F0", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "#F8FAFC" },
  typePillActive: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  typeText: { fontSize: 13, fontWeight: "700", color: "#475569" },
  typeTextActive: { color: "#FFF" },
  saveBtn: { backgroundColor: "#00A651", height: 50, borderRadius: 14, justifyContent: "center", alignItems: "center", marginTop: 10, elevation: 2 },
  saveBtnDisabled: { backgroundColor: "#CBD5E1" },
  saveBtnText: { color: "#FFF", fontWeight: "800", fontSize: 15 }
});