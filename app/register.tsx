import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApiError } from "../services/api/client";
import { updateMyProfile } from "../services/api/users";

export default function RegisterScreen() {
  const params = useLocalSearchParams();
  const paymentId = params.paymentId as string;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"customer" | "partner">("customer");

  const [roadNo, setRoadNo] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [partnerCity, setPartnerCity] = useState("");

  const [agreedPrivacy, setAgreedPrivacy] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);

  const [region, setRegion] = useState({
    latitude: 24.7955,
    longitude: 84.9994,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);

  useEffect(() => {
    if (role === "customer") {
      fetchCurrentLocationOnly();
    }
  }, [role]);

  const fetchCurrentLocationOnly = async () => {
    setMapLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = loc.coords;

      setRegion({ latitude, longitude, latitudeDelta: 0.004, longitudeDelta: 0.004 });

      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode && geocode.length > 0) {
        const place = geocode[0];
        const cleanPlaceName = place.name && !place.name.includes("+") ? place.name : "";
        const cleanStreet = place.street && !place.street.includes("+") ? place.street : "";
        let finalRoadName = `${cleanPlaceName} ${cleanStreet}`.trim();

        if (!finalRoadName) {
          finalRoadName = place.subregion || place.district || "";
        }
        setRoadNo(finalRoadName);
      }
    } catch (error) {
      console.log("Error getting location", error);
    } finally {
      setMapLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !mobile || !email) {
      Alert.alert("Error / त्रुटि", "Please fill all details!");
      return;
    }

    setLoading(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await updateMyProfile({ fullName, email: email.trim() || undefined });

      if (paymentId) {
        router.replace({ pathname: "/subscribe", params: { paymentId } } as any);
      } else {
        router.replace("/payment-gateway" as any);
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        Alert.alert("Login required", "Please sign in first so your profile can be saved to the backend.");
        router.replace("/login" as any);
        return;
      }
      Alert.alert("Registration Failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {paymentId && (
          <View style={styles.paymentAlertBadge}>
            <Text style={styles.paymentAlertText}>Payment verified! Complete your profile setup.</Text>
          </View>
        )}

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Create Account & Link Plan</Text>

          <View style={styles.roleContainer}>
            <TouchableOpacity style={[styles.roleTab, role === "customer" && styles.roleTabActive]} onPress={() => setRole("customer")}>
              <Text style={[styles.roleTabText, role === "customer" && styles.roleTabTextActive]}>Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.roleTab, role === "partner" && styles.roleTabActive]} onPress={() => setRole("partner")}>
              <Text style={[styles.roleTabText, role === "partner" && styles.roleTabTextActive]}>Partner</Text>
            </TouchableOpacity>
          </View>

          <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
          <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
          <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
          <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />

          {role === "customer" && (
            <View style={{ width: "100%" }}>
              <View style={styles.mapWrapper} />
              {mapLoading && <ActivityIndicator size="small" color="#00A651" style={{ marginBottom: 10 }} />}
              <TextInput style={styles.input} placeholder="Road No / Area" value={roadNo} onChangeText={setRoadNo} />
              <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
              <TextInput style={styles.input} placeholder="District" value={district} onChangeText={setDistrict} />
              <TextInput style={styles.input} placeholder="State" value={state} onChangeText={setState} />
              <TextInput style={styles.input} placeholder="Pin Code" keyboardType="number-pad" value={pincode} onChangeText={setPincode} />
            </View>
          )}

          {/* Policy Acceptance Checkboxes */}
          <View style={{ marginVertical: 12, gap: 10 }}>
            <TouchableOpacity
              onPress={() => setAgreedPrivacy(!agreedPrivacy)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: agreedPrivacy ? '#00A651' : '#CBD5E1', backgroundColor: agreedPrivacy ? '#00A651' : '#FFF', alignItems: 'center', justifyContent: 'center' }}>
                {agreedPrivacy && <Text style={{ color: '#FFF', fontWeight: '900', fontSize: 13 }}>✓</Text>}
              </View>
              <Text style={{ fontSize: 12, color: '#334155', flex: 1, fontWeight: '600' }}>
                I have read and agree to the <Text style={{ color: '#00A651', fontWeight: '800' }}>Privacy Policy (v2.5)</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAgreedTerms(!agreedTerms)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: agreedTerms ? '#00A651' : '#CBD5E1', backgroundColor: agreedTerms ? '#00A651' : '#FFF', alignItems: 'center', justifyContent: 'center' }}>
                {agreedTerms && <Text style={{ color: '#FFF', fontWeight: '900', fontSize: 13 }}>✓</Text>}
              </View>
              <Text style={{ fontSize: 12, color: '#334155', flex: 1, fontWeight: '600' }}>
                I agree to the <Text style={{ color: '#00A651', fontWeight: '800' }}>Terms & Conditions (v2.5)</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Finish & Register</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F7FB" },
  scrollContainer: { padding: 16, alignItems: "center" },
  paymentAlertBadge: { backgroundColor: "#E6F6ED", borderWidth: 1, borderColor: "#00A651", padding: 12, borderRadius: 12, width: "100%", marginBottom: 14 },
  paymentAlertText: { color: "#00A651", fontWeight: "800", fontSize: 13, textAlign: "center" },
  formCard: { backgroundColor: "#FFFFFF", width: "100%", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#E1F5E6", elevation: 2 },
  formTitle: { fontSize: 15, fontWeight: "800", color: "#1A1A2E", marginBottom: 14, textAlign: "center" },
  roleContainer: { flexDirection: "row", backgroundColor: "#F7F7FB", borderRadius: 12, padding: 4, marginBottom: 14 },
  roleTab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  roleTabActive: { backgroundColor: "#00A651" },
  roleTabText: { fontSize: 13, fontWeight: "700", color: "#556B5D" },
  roleTabTextActive: { color: "#FFFFFF" },
  mapWrapper: { width: "100%", height: 130, borderRadius: 12, overflow: "hidden", marginBottom: 12 },
  input: { backgroundColor: "#F7F7FB", borderWidth: 1, borderColor: "#E1F5E6", borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 14, color: "#1A1A2E", fontWeight: "600" },
  button: { backgroundColor: "#00A651", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});