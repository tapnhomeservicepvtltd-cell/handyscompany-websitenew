import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const OFFERS = [
  {
    id: "1",
    title: "Membership Offer",
    subtitle: "Labour FREE for 6 Months",
    color: "#00A651",
    icon: "crown",
  },
  {
    id: "2",
    title: "Deep Cleaning",
    subtitle: "1 Time FREE in 6 Months",
    color: "#2563EB",
    icon: "spray-bottle",
  },
  {
    id: "3",
    title: "₹49 Visit Charge",
    subtitle: "Material Cost Extra",
    color: "#F97316",
    icon: "cash",
  },
];

export default function OfferSlider() {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        data={OFFERS}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: item.color,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={40}
              color="#FFF"
            />

            <View style={styles.textBox}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.subtitle}>
                {item.subtitle}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },

  card: {
    width: 340,
    marginLeft: 16,
    marginRight: 6,
    borderRadius: 22,
    padding: 20,

    flexDirection: "row",
    alignItems: "center",
  },

  textBox: {
    marginLeft: 18,
    flex: 1,
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "900",
  },

  subtitle: {
    marginTop: 6,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});