import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: any;
  title: string;
};

export default function ServiceItem({ icon, title }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons
          name={icon}
          size={22}
          color="#00A651"
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 72,
    backgroundColor: "#2EB85C",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  title: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
  },
});