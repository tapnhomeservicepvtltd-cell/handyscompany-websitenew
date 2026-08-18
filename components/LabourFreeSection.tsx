import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// 🎯 Icons library imports
import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";

// External Static Mock Data Import
import { labourFreeHomeServices } from "@/data/services";

export default function LabourFreeSection() {
  const router = useRouter();

  if (!labourFreeHomeServices || !labourFreeHomeServices.length) {
    return null;
  }

  // 🎯 Dynamic Icon Renderer according to your exact data structure
  const renderIcon = (library: string, name: string) => {
    const iconProps = {
      name: name as any,
      size: 20, // 🎯 Icon size chota kiya (20)
      color: "#00A651",
    };

    switch (library) {
      case "FontAwesome6":
        return <FontAwesome6 {...iconProps} />;
      case "MaterialIcons":
        return <MaterialIcons {...iconProps} />;
      case "MaterialCommunityIcons":
      default:
        return <MaterialCommunityIcons {...iconProps} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.title}>
          ⭐ Labour-FREE Services
        </Text>

        <Pressable
          onPress={() => router.push("/category/labour-free")}
          style={styles.viewAllBtn}
        >
          <Text style={styles.viewAll}>View All</Text>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={16} 
            color="#00A651" 
          />
        </Pressable>
      </View>

      {/* 🎯 Single Line Horizontal Scroll Layout */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {labourFreeHomeServices.slice(0, 6).map((item) => (
          <Pressable
            key={item.id}
            style={styles.item}
            onPress={() => router.push(`/category/${item.id}` as any)}
          >
            {/* 🎯 Icon Box (width: 40, height: 40, borderRadius: 12) */}
            <View style={styles.iconBox}>
              {renderIcon(item.library, item.icon)}
            </View>

            <Text style={styles.name} numberOfLines={2}>
              {item.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginBottom: 10,
  },

  header: {
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16, // Header padding screen edges ke liye
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAll: {
    color: "#00A651",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 2,
  },

  // 🎯 Horizontal Scroll Layout Container
  scrollContainer: {
    paddingHorizontal: 16, // Screen side spacing
    paddingBottom: 8,      // Shadow visibility ke liye
  },

  // 🎯 Premium Card Styling (Fixed width added for smooth horizontal alignment)
  item: {
    width: 110, // Fixed width taaki single row me wrap na ho aur clear dikhe
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    alignItems: "center",
    marginRight: 12, // Horizontal spacing elements ke beech me
    
    // Premium Soft Shadow
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },

  // 🎯 Icon Box Specs
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F0FDF4", // Soft green aesthetic background
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  name: {
    fontSize: 11,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    paddingHorizontal: 4,
    lineHeight: 14,
  },
});