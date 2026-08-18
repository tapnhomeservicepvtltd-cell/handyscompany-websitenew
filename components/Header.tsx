import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  city?: string;
  greeting?: string;
  notificationCount?: number;
  onNotificationPress?: () => void;
};

export default function Header({
  city = "Gaya, Bihar",
  greeting = "Good Morning 👋",
  notificationCount = 1,
  onNotificationPress,
}: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.greeting}>
        {greeting}
      </Text>

      <View style={styles.row}>

        <View>

          <Text style={styles.locationLabel}>
            Current Location
          </Text>

          <View style={styles.locationRow}>

            <MaterialCommunityIcons
              name="map-marker"
              size={18}
              color="#00A651"
            />

            <Text style={styles.location}>
              {city}
            </Text>

          </View>

        </View>

        <Pressable
          style={styles.notification}
          onPress={onNotificationPress}
        >

          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#111827"
          />

          {notificationCount > 0 && (

            <View style={styles.badge}>

              <Text style={styles.badgeText}>
                {notificationCount > 9
                  ? "9+"
                  : notificationCount}
              </Text>

            </View>

          )}

        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 18,
    backgroundColor: "#F8FAFC",
  },

  greeting: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },

  row: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  locationLabel: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
  },

  locationRow: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  location: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  notification: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  badge: {
    position: "absolute",
    top: 10,
    right: 10,

    minWidth: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: "#EF4444",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
  },

});