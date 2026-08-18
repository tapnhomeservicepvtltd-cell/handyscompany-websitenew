import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

const comparison = [
  {
    title: "Electrician",
    normal: 399,
    member: 49,
    save: 350,
    icon: "flash",
  },
  {
    title: "Plumber",
    normal: 350,
    member: 49,
    save: 301,
    icon: "water-pump",
  },
  {
    title: "Carpenter",
    normal: 450,
    member: 49,
    save: 401,
    icon: "hammer",
  },
];

export default function MembershipComparison() {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        💰 Why Membership Saves Money
      </Text>

      <Text style={styles.subHeading}>
        Compare Normal Service Cost vs Membership
      </Text>

      {comparison.map((item) => (

        <View
          key={item.title}
          style={styles.card}
        >

          <View style={styles.topRow}>

            <View style={styles.iconCircle}>

              <MaterialCommunityIcons
                name={item.icon as any}
                size={26}
                color="#00A651"
              />

            </View>

            <Text style={styles.service}>
              {item.title}
            </Text>

          </View>

          <View style={styles.compareRow}>

            <View style={styles.normalBox}>

              <Text style={styles.label}>
                Without Membership
              </Text>

              <Text style={styles.normalPrice}>
                ₹{item.normal}
              </Text>

            </View>

            <MaterialCommunityIcons
              name="arrow-right"
              size={28}
              color="#94A3B8"
            />

            <View style={styles.memberBox}>

              <Text style={styles.labelGreen}>
                Member Pays
              </Text>

              <Text style={styles.memberPrice}>
                ₹{item.member}
              </Text>

            </View>

          </View>

          <View style={styles.saveBox}>

            <MaterialCommunityIcons
              name="cash-check"
              size={22}
              color="#00A651"
            />

            <Text style={styles.saveText}>
              You Save ₹{item.save}
            </Text>

          </View>

        </View>

      ))}

      {/* Membership Recovery */}

      <View style={styles.recoveryCard}>

        <Text style={styles.recoveryTitle}>
          Membership Recovery
        </Text>

        <View style={styles.progressBg}>

          <View style={styles.progressFill} />

        </View>

        <Text style={styles.recoveryText}>
          Recover Membership Cost in
        </Text>

        <Text style={styles.recoveryDays}>
          Just 2–3 Service Visits
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },

  heading: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1E293B",
  },

  subHeading: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,

    elevation: 5,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#EAFBF2",
    justifyContent: "center",
    alignItems: "center",
  },

  service: {
    marginLeft: 14,
    fontSize: 18,
    fontWeight: "900",
    color: "#1E293B",
  },

  compareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  normalBox: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
  },

  memberBox: {
    flex: 1,
    backgroundColor: "#EAFBF2",
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
  },

  label: {
    color: "#DC2626",
    fontSize: 11,
    fontWeight: "800",
  },

  labelGreen: {
    color: "#00A651",
    fontSize: 11,
    fontWeight: "800",
  },

  normalPrice: {
    fontSize: 28,
    fontWeight: "900",
    color: "#DC2626",
    marginTop: 6,
    textDecorationLine: "line-through",
  },

  memberPrice: {
    fontSize: 36,
    fontWeight: "900",
    color: "#00A651",
    marginTop: 4,
  },

  saveBox: {
    marginTop: 18,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: {
    marginLeft: 8,
    color: "#00A651",
    fontWeight: "900",
    fontSize: 18,
  },

  recoveryCard: {
    marginTop: 20,
    backgroundColor: "#00A651",
    borderRadius: 24,
    padding: 22,
  },

  recoveryTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },

  progressBg: {
    height: 12,
    backgroundColor: "rgba(255,255,255,.25)",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 22,
  },

  progressFill: {
    width: "82%",
    height: "100%",
    backgroundColor: "#FFD54F",
    borderRadius: 20,
  },

  recoveryText: {
    textAlign: "center",
    color: "#EAFBF2",
    marginTop: 18,
    fontSize: 15,
  },

  recoveryDays: {
    textAlign: "center",
    color: "#FFD54F",
    marginTop: 6,
    fontSize: 28,
    fontWeight: "900",
  },
});