import React from "react";
import { View } from "react-native";

type AddressMapProps = {
  onLocationChange?: (coords: { latitude: number; longitude: number }) => void;
  onLocationDetected?: (coords: { latitude: number; longitude: number }) => void;
};

// This component will be resolved to AddressMap.native.tsx on native or AddressMap.web.tsx on web
export default function AddressMap(_props: AddressMapProps) {
  return <View style={{ flex: 1 }} />;
}