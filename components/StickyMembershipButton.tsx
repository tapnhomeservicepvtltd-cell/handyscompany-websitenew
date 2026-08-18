import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function StickyMembershipButton() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>

      <LinearGradient
        colors={["#00A651", "#008C45"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >

        <View>

          <Text style={styles.price}>
            ₹699
          </Text>

          <Text style={styles.subtitle}>
            6 Months Membership
          </Text>

        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => router.push("/subscribe")}
        >

          <Text style={styles.buttonText}>
            JOIN NOW
          </Text>

          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={24}
            color="#00A651"
          />

        </TouchableOpacity>

      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },

  container: {
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
  },

  price: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
  },

  subtitle: {
    color: "#EAFBF2",
    fontSize: 13,
    marginTop: 2,
  },

  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    color: "#00A651",
    fontWeight: "900",
    fontSize: 16,
    marginRight: 8,
  },

});