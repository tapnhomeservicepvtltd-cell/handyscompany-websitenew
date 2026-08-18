import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import MetricCard from "./MetricCard";
import ServiceItem from "./ServiceItem";

export default function MembershipCard() {
  return (
    <View style={styles.container}>

      {/* MOST POPULAR */}

      <View style={styles.badge}>
        <Ionicons
          name="star"
          size={15}
          color="#FFD84D"
        />

        <Text style={styles.badgeText}>
          MOST POPULAR
        </Text>
      </View>

      {/* TITLE */}

      <Text style={styles.title}>
        🏠 Unlimited Home Services
      </Text>

      {/* PRICE */}

      <View style={styles.priceRow}>

        <Text style={styles.price}>
          ₹699
        </Text>

        <View>

          <Text style={styles.once}>
            sirf ek baar
          </Text>

          <Text style={styles.month}>
            6 mahine ke liye
          </Text>

        </View>

      </View>

      {/* METRICS */}

      <View style={styles.metricRow}>

        <MetricCard
          value="6"
          label="Mahine"
        />

        <MetricCard
          value="∞"
          label="Unlimited Visits"
        />

        <MetricCard
          value="₹0"
          label="Labour Charge"
        />

      </View>

      {/* PRICE BAR */}

      <View style={styles.yellowCard}>

        <View>

          <Text style={styles.small}>
            SIRF ITNA KHARCH
          </Text>

          <Text style={styles.dayPrice}>
            ₹3.88 / din
          </Text>

        </View>

        <View style={styles.rightTea}>

          <Ionicons
            name="cafe"
            size={26}
            color="#1A1A1A"
          />

          <Text style={styles.tea}>
            Ek chai se bhi kam!
          </Text>

        </View>

      </View>

      {/* GREEN MESSAGE */}

      <View style={styles.infoCard}>

        <Text style={styles.infoTitle}>
          🏠 Ek baar do,
          6 mahine tension-free raho!
        </Text>

        <Text style={styles.infoSub}>
          Har visit pe sirf ₹49 —
          labour ka ek paisa nahi!
        </Text>

      </View>

      {/* SERVICES */}

      <View style={styles.serviceGrid}>

        <ServiceItem
          icon="water-pump"
          title="Plumbing Free"
        />

        <ServiceItem
          icon="flash"
          title="Electrical Free"
        />

        <ServiceItem
          icon="hammer"
          title="Carpenter Free"
        />

        <ServiceItem
          icon="washing-machine"
          title="Appliance Free"
        />

        <ServiceItem
          icon="calendar-check"
          title="Monthly Checkup"
        />

        <ServiceItem
          icon="spray-bottle"
          title="Home Cleaning"
        />

      </View>

      {/* BONUS */}

      <View style={styles.bonus}>

        <Text style={styles.bonusText}>
          🎁 FREE Home Cleaning worth ₹1000+
        </Text>

      </View>

      {/* BUTTON */}

      <TouchableOpacity style={styles.button}>

        <Text style={styles.buttonText}>
          Book Now @ ₹699
        </Text>

        <Ionicons
          name="arrow-forward-circle"
          size={30}
          color="#FFF"
        />

      </TouchableOpacity>

      {/* FOOTER */}

      <Text style={styles.footer}>
        ✔ Verified Professionals |
        Service Within 20 Mins
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00A651",
    borderRadius: 26,
    padding: 18,
    marginTop: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 6,
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 18,
  },

  badgeText: {
    color: "#00A651",
    fontSize: 12,
    fontWeight: "900",
    marginLeft: 6,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 34,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 18,
    marginBottom: 18,
  },

  price: {
    color: "#FFFFFF",
    fontSize: 60,
    fontWeight: "900",
    lineHeight: 64,
  },

  once: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 10,
  },

  month: {
    color: "#EAF9F1",
    fontSize: 13,
    marginLeft: 10,
    marginTop: 2,
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  yellowCard: {
    backgroundColor: "#FFE066",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  small: {
    color: "#1E293B",
    fontWeight: "900",
    fontSize: 11,
  },

  dayPrice: {
    color: "#1E293B",
    fontWeight: "900",
    fontSize: 26,
    marginTop: 3,
  },

  rightTea: {
    alignItems: "center",
  },

  tea: {
    color: "#1E293B",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 4,
  },

  infoCard: {
    backgroundColor: "#16954A",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },

  infoTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },

  infoSub: {
    color: "#EAF9F1",
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },

  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  bonus: {
    backgroundColor: "#1AA858",
    borderRadius: 40,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 18,
  },

  bonusText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 14,
  },

  button: {
    backgroundColor: "#101010",
    borderRadius: 40,
    height: 58,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginRight: 8,
  },

  footer: {
    color: "#EAF9F1",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 12,
  },
});