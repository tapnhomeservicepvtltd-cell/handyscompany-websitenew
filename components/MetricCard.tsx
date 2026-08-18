import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  value: string;
  label: string;
};

export default function MetricCard({ value, label }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 74,
    backgroundColor: "#2EB85C",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  value: {
    color: "#FFD84D",
    fontSize: 24,
    fontWeight: "900",
  },

  label: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },
});