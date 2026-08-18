import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface AddressMapWebProps {
  onLocationChange?: (coords: { latitude: number; longitude: number }) => void;
  onLocationDetected?: (coords: { latitude: number; longitude: number }) => void;
}

export default function AddressMap({ onLocationChange, onLocationDetected }: AddressMapWebProps) {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser");
      return;
    }

    // 🗺️ ब्राउज़र से लाइव लोकेशन फेच करना
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationData = { latitude, longitude };
        setCoords(locationData);
        // पैरेंट कंपोनेंट (Form) को लाइव कोऑर्डिनेट्स भेजना
        if (onLocationChange) {
          onLocationChange(locationData);
        }
        if (onLocationDetected) {
          onLocationDetected(locationData);
        }
      },
      (error) => {
        setErrorMsg("Location permission denied or unavailable");
        console.log("Error getting location: ", error);
      }
    );
  }, [onLocationChange, onLocationDetected]);

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>❌ {errorMsg}</Text>
      </View>
    );
  }

  if (!coords) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Fetching your current location...</Text>
      </View>
    );
  }

  // 🌟 लाइव कोऑर्डिनेट्स के साथ डायनेमिक गूगल मैप्स आईफ्रेम
  const mapUrl = `https://maps.google.com/maps?q=${coords.latitude},${coords.longitude}&z=16&output=embed`;

  return (
    <View style={{ flex: 1 }}>
      {/* @ts-ignore */}
      <iframe
        src={mapUrl}
        style={{
          width: "100%",
          height: "100%",
          border: 0,
        }}
        allowFullScreen
        loading="lazy"
      />
    </View>
  );
}

interface StylesInterface {
  center: ViewStyle;
  loadingText: TextStyle;
  errorText: TextStyle;
}

const styles = StyleSheet.create<StylesInterface>({
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC", padding: 20 },
  loadingText: { fontSize: 14, color: "#64748B", fontWeight: "600" },
  errorText: { fontSize: 13, color: "#EF4444", fontWeight: "700", textAlign: "center" }
});