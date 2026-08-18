import { View } from "react-native";

type TrackingPoint = { latitude: number; longitude: number };

export type TrackingMapProps = {
  region: TrackingPoint & { latitudeDelta: number; longitudeDelta: number };
  point?: TrackingPoint;
  address?: TrackingPoint;
};

export default function TrackingMap(_props: TrackingMapProps) {
  return <View style={{ flex: 1 }} />;
}
