import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

const normalServices = [
  {
    icon: "flash",
    name: "Electrician",
    price: 399,
  },
  {
    icon: "water-pump",
    name: "Plumber",
    price: 350,
  },
  {
    icon: "hammer",
    name: "Carpenter",
    price: 450,
  },
  {
    icon: "broom",
    name: "Deep Cleaning",
    price: 999,
  },
];

const total = normalServices.reduce(
  (sum, item) => sum + item.price,
  0
);

const save = total - 49;

export default function SavingsCalculator() {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        💰 See How Much You Save
      </Text>

      <Text style={styles.subHeading}>
        Without Membership vs With Membership
      </Text>

      <View style={styles.whiteCard}>

        <Text style={styles.cardTitle}>
          Without Membership
        </Text>

        {normalServices.map((item) => (

          <View
            key={item.name}
            style={styles.row}
          >

            <View style={styles.left}>

              <MaterialCommunityIcons
                name={item.icon as any}
                size={20}
                color="#475569"
              />

              <Text style={styles.serviceName}>
                {item.name}
              </Text>

            </View>

            <Text style={styles.price}>
              ₹{item.price}
            </Text>

          </View>

        ))}

        <View style={styles.divider} />

        <View style={styles.totalRow}>

          <Text style={styles.totalText}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            ₹{total}
          </Text>

        </View>

      </View>

      <View style={styles.arrowCircle}>
        <MaterialCommunityIcons
          name="arrow-down"
          size={28}
          color="#FFFFFF"
        />
      </View>

      <View style={styles.greenCard}>

        <Text style={styles.memberTitle}>
          With Membership
        </Text>

        <View style={styles.memberRow}>
          <Text style={styles.memberLabel}>
            Visit Charge
          </Text>

          <Text style={styles.memberValue}>
            ₹49
          </Text>
        </View>

        <View style={styles.memberRow}>
          <Text style={styles.memberLabel}>
            Labour Charge
          </Text>

          <Text style={styles.freeText}>
            FREE
          </Text>
        </View>

        <View style={styles.dividerLight} />

        <Text style={styles.saveTitle}>
          🎉 YOU SAVE
        </Text>

        <Text style={styles.savePrice}>
          ₹{save}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
  },

  subHeading: {
    marginTop: 4,
    marginBottom: 18,
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },

  whiteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#DC2626",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  serviceName: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },

  price: {
    fontSize: 17,
    fontWeight: "900",
    color: "#DC2626",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 14,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  totalText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },

  totalPrice: {
    fontSize: 24,
    fontWeight: "900",
    color: "#DC2626",
  },

  arrowCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#00A651",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
    elevation: 8,
  },

  greenCard: {
    backgroundColor: "#00A651",
    borderRadius: 22,
    padding: 22,
    shadowColor: "#00A651",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 8,
  },

  memberTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 18,
  },

  memberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  memberLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  memberValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },

  freeText: {
    color: "#FFD54F",
    fontSize: 20,
    fontWeight: "900",
  },

  dividerLight: {
    height: 1,
    backgroundColor: "rgba(255,255,255,.25)",
    marginVertical: 18,
  },

  saveTitle: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  savePrice: {
    textAlign: "center",
    color: "#FFD54F",
    fontSize: 52,
    fontWeight: "900",
    marginTop: 8,
  },
});