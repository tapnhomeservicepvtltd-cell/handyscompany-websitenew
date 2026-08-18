import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function LocationCard() {
  return (
    <Pressable style={styles.container}>
      <View style={styles.left}>
        <MaterialCommunityIcons
          name="map-marker"
          size={22}
          color="#00A651"
        />

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.label}>
            Current Location
          </Text>

          <Text
            style={styles.address}
            numberOfLines={1}
          >
            Gaya, Bihar
          </Text>
        </View>
      </View>

      <MaterialCommunityIcons
        name="chevron-down"
        size={24}
        color="#64748B"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#64748B",
  },

  address: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
});