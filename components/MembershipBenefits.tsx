import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

const benefits = [
  {
    icon: "cash-remove",
    title: "Labour FREE",
    subtitle: "No Labour Charges",
  },
  {
    icon: "currency-inr",
    title: "₹49 Visit",
    subtitle: "Fixed Visit Charge",
  },
  {
    icon: "tools",
    title: "120+ Services",
    subtitle: "All Home Services",
  },
  {
    icon: "washing-machine",
    title: "Appliance Repair",
    subtitle: "Household Appliances",
  },
  {
    icon: "calendar-check",
    title: "Monthly Inspection",
    subtitle: "Preventive Checkup",
  },
  {
    icon: "broom",
    title: "FREE Cleaning",
    subtitle: "Worth ₹1000+",
  },
  {
    icon: "shield-check",
    title: "Verified Staff",
    subtitle: "Background Verified",
  },
  {
    icon: "clock-fast",
    title: "Fast Response",
    subtitle: "Within 20 Minutes",
  },
];

export default function MembershipBenefits() {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        💎 Membership Benefits
      </Text>

      <Text style={styles.subHeading}>
        Everything Included In Your Membership
      </Text>

      <View style={styles.grid}>

        {benefits.map((item) => (

          <View
            key={item.title}
            style={styles.card}
          >

            <View style={styles.iconBox}>

              <MaterialCommunityIcons
                name={item.icon as any}
                size={30}
                color="#00A651"
              />

            </View>

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.subtitle}>
              {item.subtitle}
            </Text>

          </View>

        ))}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 20,
  },

  heading: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111827",
  },

  subHeading: {
    marginTop: 4,
    marginBottom: 20,
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 14,
    marginBottom: 16,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E9F9F0",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 14,
  },

  title: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    color: "#64748B",
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },
});