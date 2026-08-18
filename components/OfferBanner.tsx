import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OfferBanner() {
  return (
    <View style={styles.container}>
      {/* Left Mini Badge */}
      <View style={styles.leftCard}>
        <Text style={styles.offerText}>OFFER</Text>
      </View>

      {/* Center Gift Text */}
      <View style={styles.giftBox}>
        <MaterialCommunityIcons
          name="gift"
          size={18}
          color="#F59E0B"
        />
        <View style={styles.textWrapper}>
          <Text style={styles.deepTitle} numberOfLines={1}>
            FREE Deep Cleaning <Text style={styles.deepSub}>Worth ₹1000+</Text>
          </Text>
        </View>
      </View>

      {/* Right Compact Timer */}
      <View style={styles.timerBox}>
        <Text style={styles.time}>02</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.time}>15</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.time}>43</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44, // Strict minimal single-line height
  },

  leftCard: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  offerText: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  giftBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 8,
  },

  textWrapper: {
    marginLeft: 6,
    flex: 1,
  },

  deepTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
  },

  deepSub: {
    fontSize: 11,
    fontWeight: "800",
    color: "#F59E0B",
  },

  timerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },

  time: {
    fontSize: 12,
    fontWeight: "900",
    color: "#00A651",
    minWidth: 15,
    textAlign: "center",
  },

  colon: {
    fontSize: 12,
    fontWeight: "900",
    color: "#00A651",
    marginHorizontal: 1,
    bottom: 0.5, // Perfect baseline alignment
  },
});