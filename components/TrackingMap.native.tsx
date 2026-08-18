import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

type TrackingPoint = { latitude: number; longitude: number };

type TrackingMapProps = {
  region: TrackingPoint & { latitudeDelta: number; longitudeDelta: number };
  point?: TrackingPoint;
  address?: TrackingPoint;
};

export default function TrackingMap({ region, point, address }: TrackingMapProps) {
  return (
    <MapView style={StyleSheet.absoluteFill} region={region}>
      {point && <Marker coordinate={point} title="Technician" pinColor="#00A651" />}
      {address && <Marker coordinate={address} title="Service address" pinColor="#EC4899" />}
    </MapView>
  );
}
