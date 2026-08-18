import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";

// 🌟 TypeScript को एरर देने से रोकने के लिए डायरेक्ट रिलेटिव पाथ से इंपोर्ट
import AddressMap from "../../components/AddressMap";
import { ApiError } from "../../services/api/client";
import { createAddress } from "../../services/api/addresses";
import * as Location from "expo-location";

export default function LocationScreen() {
  const router = useRouter();
  const { serviceId, serviceName } = useLocalSearchParams<{ serviceId?: string; serviceName?: string }>();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [flatNumber, setFlatNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [addressType, setAddressType] = useState<"Home" | "Office" | "Other">("Home");

  const [currentTextAddress, setCurrentTextAddress] = useState("Fetching location details...");

  // Fetch real address when map pin moves
  React.useEffect(() => {
    if (!location) return;
    const fetchAddress = async () => {
      try {
        const result = await Location.reverseGeocodeAsync({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        if (result.length > 0) {
          const { street, district, city: resCity, subregion, region: resState, postalCode: resPin } = result[0];
          const addressString = [street, district, subregion, resCity, resState, resPin].filter(Boolean).join(", ");
          setCurrentTextAddress(addressString || "Unknown Location");
          
          if (resCity) setCity(resCity);
          if (resState) setState(resState);
          if (resPin) setPostalCode(resPin);
        }
      } catch (e) {
        setCurrentTextAddress("Failed to load address. Please enter manually.");
      }
    };
    fetchAddress();
  }, [location]);

  const saveAddress = async () => {
    if (!flatNumber.trim() || !city.trim() || !state.trim() || !/^\d{6}$/.test(postalCode)) {
      Alert.alert("Complete address", "Enter house/flat number, city, state, and a valid 6-digit postal code.");
      return;
    }

    setSaving(true);
    try {
      const address = await createAddress({
        label: addressType === "Home" ? "HOME" : addressType === "Office" ? "WORK" : "OTHER",
        addressLine1: flatNumber.trim(),
        addressLine2: currentTextAddress,
        landmark: landmark.trim() || undefined,
        city: city.trim(),
        state: state.trim(),
        postalCode,
        country: "India",
        latitude: location?.latitude ?? undefined,
        longitude: location?.longitude ?? undefined,
        isDefault: false,
      });
      router.replace({ pathname: "/booking/date", params: { addressId: address.id, serviceId, serviceName } } as any);
    } catch (caught) {
      Alert.alert("Unable to save address", caught instanceof ApiError ? caught.message : "Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container as any}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
          </Pressable>
          <Text style={styles.title}>Confirm Location</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Dynamic Platform Map Component */}
        <AddressMap onLocationChange={setLocation} />

        {/* Address Fields Block */}
        <View style={styles.card}>
          <Text style={styles.label}>📍 SELECTED AREA</Text>
          <Text style={styles.addressText}>{currentTextAddress}</Text>

          <View style={styles.divider} />

          {/* House/Flat Input */}
          <Text style={styles.label}>HOUSE / FLAT / BLOCK NO.</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Flat 302, Sai Apartment"
            placeholderTextColor="#94A3B8"
            value={flatNumber}
            onChangeText={setFlatNumber}
          />

          <Text style={styles.label}>CITY</Text>
          <TextInput style={styles.input} placeholder="e.g. Gaya" value={city} onChangeText={setCity} />

          <Text style={styles.label}>STATE</Text>
          <TextInput style={styles.input} placeholder="e.g. Bihar" value={state} onChangeText={setState} />

          <Text style={styles.label}>POSTAL CODE</Text>
          <TextInput style={styles.input} placeholder="6-digit PIN code" value={postalCode} onChangeText={setPostalCode} keyboardType="number-pad" maxLength={6} />

          {/* Landmark Input */}
          <Text style={styles.label}>LANDMARK (OPTIONAL)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Near Hanuman Mandir"
            placeholderTextColor="#94A3B8"
            value={landmark}
            onChangeText={setLandmark}
          />

          {/* Address Tags */}
          <Text style={styles.label}>SAVE ADDRESS AS</Text>
          <View style={styles.tagRow}>
            {["Home", "Office", "Other"].map((tag) => {
              const isActive = addressType === tag;
              const iconName = tag === "Home" ? "home" : tag === "Office" ? "briefcase" : "map-marker-outline";
              return (
                <Pressable
                  key={tag}
                  style={[styles.tagPill, isActive && styles.tagPillActive]}
                  onPress={() => setAddressType(tag as any)}
                >
                  <MaterialCommunityIcons name={iconName as any} size={16} color={isActive ? "#fff" : "#475569"} />
                  <Text style={[styles.tagText, isActive && styles.tagTextActive]}>{tag}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Action button */}
        <Pressable
          disabled={saving}
          style={[styles.button, !flatNumber && styles.buttonDisabled]}
          onPress={() => void saveAddress()}
        >
          {saving ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Confirm & Proceed</Text>}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 18,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 6,
  },
  addressText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#1E293B",
    backgroundColor: "#F8FAFC",
    fontWeight: "600",
  },
  tagRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  tagPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF",
  },
  tagPillActive: {
    backgroundColor: "#0F172A",
    borderColor: "#0F172A",
  },
  tagText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
  tagTextActive: {
    color: "#FFF",
  },
  button: {
    marginTop: 24,
    backgroundColor: "#00A651",
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: "#CBD5E1",
    elevation: 0,
  },
  btnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
