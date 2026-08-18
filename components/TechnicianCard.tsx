import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Props {
  technician: {
    name: string;
    photo: string;
    rating: number;
    experience: string;
    jobs: number;
  };
}

export default function TechnicianCard({
  technician,
}: Props) {
  if (!technician) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        👨‍🔧 Assigned Technician
      </Text>

      <View style={styles.row}>
        <Image
          source={{ uri: technician.photo }}
          style={styles.image}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {technician.name}
          </Text>

          <View style={styles.ratingRow}>
            <MaterialCommunityIcons
              name="star"
              size={16}
              color="#F59E0B"
            />

            <Text style={styles.rating}>
              {technician.rating}
            </Text>

            <Text style={styles.gray}>
              • {technician.jobs}+ Jobs
            </Text>
          </View>

          <Text style={styles.exp}>
            {technician.experience} Experience
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 18,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    elevation: 2,
  },

  heading: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 14,
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  rating: {
    marginLeft: 4,
    fontWeight: "700",
  },

  gray: {
    marginLeft: 8,
    color: "#64748B",
  },

  exp: {
    marginTop: 6,
    color: "#00A651",
    fontWeight: "700",
  },
});