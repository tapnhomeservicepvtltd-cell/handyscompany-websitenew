import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HeroMembership() {
  return (
    <LinearGradient
      colors={["#00A651", "#008C45"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >

      {/* Badge */}

      <View style={styles.badge}>
        <MaterialCommunityIcons
          name="crown"
          size={18}
          color="#FFD54F"
        />

        <Text style={styles.badgeText}>
          HANDYSCOMPANY MEMBERSHIP
        </Text>
      </View>

      {/* Main Heading */}

      <Text style={styles.title}>
        Pay Once.
      </Text>

      <Text style={styles.title}>
        Enjoy Labour-Free
      </Text>

      <Text style={styles.title}>
        Home Services
      </Text>

      <Text style={styles.subtitle}>
        for 6 Months
      </Text>

      {/* Price */}

      <View style={styles.priceRow}>

        <Text style={styles.price}>
          ₹699
        </Text>

        <View>

          <Text style={styles.small}>
            One Time
          </Text>

          <Text style={styles.small}>
            Payment
          </Text>

        </View>

      </View>

      {/* Rating */}

      <View style={styles.ratingRow}>

        <MaterialCommunityIcons
          name="star"
          size={18}
          color="#FFD54F"
        />

        <Text style={styles.rating}>
          4.9 Rating
        </Text>

        <Text style={styles.member}>
          • 25,000+ Happy Members
        </Text>

      </View>

      {/* CTA */}

      <TouchableOpacity
        style={styles.button}
      >

        <Text style={styles.buttonText}>
          JOIN MEMBERSHIP
        </Text>

      </TouchableOpacity>

    </LinearGradient>
  );
}

    const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 28,
    padding: 24,
    minHeight: 420,
    justifyContent: "space-between",
    shadowColor: "#00A651",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 12,
    overflow: "hidden",
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,.18)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    marginLeft: 8,
    letterSpacing: 0.5,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40,
    marginTop: 6,
  },

  subtitle: {
    color: "#E7FFF1",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 28,
  },

  price: {
    color: "#FFFFFF",
    fontSize: 72,
    fontWeight: "900",
    lineHeight: 72,
    marginRight: 14,
  },

  small: {
    color: "#D7F9E6",
    fontSize: 14,
    fontWeight: "700",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
  },

  rating: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 6,
  },

  member: {
    color: "#EAFBF2",
    fontSize: 14,
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#FFFFFF",
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },

  buttonText: {
    color: "#00A651",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});


