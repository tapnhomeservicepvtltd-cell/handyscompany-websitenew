import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function AddressMap({ onLocationChange }: any) {
  const [region, setRegion] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          // Fallback to default location
          setRegion({
            latitude: 24.7914,
            longitude: 85.0002,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      } catch (error) {
        setRegion({
          latitude: 24.7914,
          longitude: 85.0002,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    })();
  }, []);

  if (!region) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F5F9' }]}>
        <ActivityIndicator color="#00A651" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        onRegionChangeComplete={(r: any) => onLocationChange?.(r)}
      />
      <View style={styles.markerFixed} pointerEvents="none">
        <MaterialCommunityIcons name="map-marker" size={38} color="#00A651" />
        <View style={styles.markerShadow} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 220, position: "relative", borderRadius: 16, overflow: 'hidden', marginVertical: 10 },
  map: { flex: 1 },
  markerFixed: { position: "absolute", top: "50%", left: "50%", marginLeft: -19, marginTop: -38, alignItems: "center" },
  markerShadow: { width: 8, height: 4, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 4, marginTop: -2 },
});