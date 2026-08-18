import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";
import AddressMap from "./AddressMap";

interface MapPickerProps {
  visible: boolean;
  onClose: () => void;
  onSaveAddress: () => void;
}

export default function FullMapPickerSheet({ visible, onClose, onSaveAddress }: MapPickerProps) {
  // 🌟 डिफॉल्ट रूप से आपका गया जंक्शन वाला एड्रेस रहेगा, लेकिन जैसे ही जीपीएस चलेगा यह बदल जाएगा
  const [detectedAddress, setDetectedAddress] = useState<string>(
    "Gaya Junction, Station Road, Gaya, Bihar - 823001"
  );
  const [areaTitle, setAreaTitle] = useState<string>("Gaya Junction");
  const [isHomeTag, setIsHomeTag] = useState(true);

  // 🔄 जब AddressMap से लाइव जीपीएस कोऑर्डिनेट्स मिलेंगे, तो यह फंक्शन उन्हें पकड़ लेगा
  const handleLocationChange = (coords: { latitude: number; longitude: number }) => {
    // यहाँ आपका जीपीएस लाइव डेटा सिंक हो रहा है
    setAreaTitle("📍 Current Live Location");
    setDetectedAddress(
      `Verified Coordinates: Lat ${coords.latitude.toFixed(4)}, Lng ${coords.longitude.toFixed(4)} (Fetching near Area...)`
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Top Header Controls */}
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <Text style={styles.headerTitle}>Confirm Current Location</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Live Map Component */}
        <View style={styles.mapContainer}>
          <AddressMap onLocationDetected={handleLocationChange} />
        </View>

        {/* Bottom Address Form Widget */}
        <View style={styles.addressFormCard}>
          <View style={styles.locationMetaRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.locTitle}>{areaTitle}</Text>
              <Text style={styles.locSub} numberOfLines={2}>
                {detectedAddress}
              </Text>
            </View>
          </View>

          <TextInput
            placeholder="House / Flat / Block No.*"
            placeholderTextColor="#94A3B8"
            style={styles.inputField}
          />
          
          <TextInput
            placeholder="Landmark (Optional)"
            placeholderTextColor="#94A3B8"
            style={styles.inputField}
          />

          <View style={styles.tagHeaderRow}>
            <Text style={styles.tagLabel}>Save address as</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable 
                style={[styles.tagBadge, isHomeTag && styles.activeTagBadge]}
                onPress={() => setIsHomeTag(true)}
              >
                <Text style={[styles.tagText, isHomeTag && styles.textWhite]}>Home</Text>
              </Pressable>
              <Pressable 
                style={[styles.tagBadge, !isHomeTag && styles.activeTagBadge]}
                onPress={() => setIsHomeTag(false)}
              >
                <Text style={[styles.tagText, !isHomeTag && styles.textWhite]}>Other</Text>
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.primaryActionBtn} onPress={onSaveAddress}>
            <Text style={styles.primaryActionBtnText}>Save and proceed to slots</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

interface StylesProps {
  container: ViewStyle;
  header: ViewStyle;
  backBtn: ViewStyle;
  headerTitle: TextStyle;
  mapContainer: ViewStyle;
  addressFormCard: ViewStyle;
  locationMetaRow: ViewStyle;
  locTitle: TextStyle;
  locSub: TextStyle;
  inputField: ViewStyle & TextStyle;
  tagHeaderRow: ViewStyle;
  tagLabel: TextStyle;
  tagBadge: ViewStyle;
  activeTagBadge: ViewStyle;
  tagText: TextStyle;
  textWhite: TextStyle;
  primaryActionBtn: ViewStyle;
  primaryActionBtnText: TextStyle;
}

const styles: StylesProps = StyleSheet.create<StylesProps>({
  container: { flex: 1, backgroundColor: "#FFF", maxWidth: Platform.OS === "web" ? 500 : "100%", width: "100%", alignSelf: "center" },
  header: { height: 60, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, borderBottomWidth: 1, borderColor: "#E2E8F0" },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 15, fontWeight: "800", color: "#0F172A" },
  mapContainer: { flex: 1, backgroundColor: "#F1F5F9" },
  addressFormCard: { padding: 20, backgroundColor: "#FFF", borderTopWidth: 1, borderColor: "#E2E8F0" },
  locationMetaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  locTitle: { fontSize: 15, fontWeight: "900", color: "#0F172A" },
  locSub: { fontSize: 13, color: "#64748B", marginTop: 4, fontWeight: "500", lineHeight: 18 },
  inputField: { borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, height: 46, paddingHorizontal: 14, fontSize: 13, color: "#1E293B", backgroundColor: "#F8FAFC", fontWeight: "600", marginBottom: 12 },
  tagHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 6 },
  tagLabel: { fontSize: 13, fontWeight: "700", color: "#475569" },
  tagBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: "#F1F5F9", borderWidth: 1, borderColor: "#E2E8F0" },
  activeTagBadge: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  tagText: { fontSize: 12, fontWeight: "700", color: "#475569" },
  textWhite: { color: "#FFF" },
  primaryActionBtn: { backgroundColor: "#6B21A8", height: 48, borderRadius: 12, justifyContent: "center", alignItems: "center", marginTop: 18 },
  primaryActionBtnText: { color: "#FFF", fontWeight: "900", fontSize: 15 },
});