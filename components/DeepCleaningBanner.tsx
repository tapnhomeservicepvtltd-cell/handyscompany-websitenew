import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DeepCleaningBanner() {

  const router = useRouter();

  return (

    <Pressable
      style={styles.card}
      onPress={() => router.push("/category/cleaning")}
    >

      {/* Header */}

      <View style={styles.header}>

        <MaterialCommunityIcons
          name="gift"
          size={34}
          color="#FFD700"
        />

        <View style={{ flex: 1, marginLeft: 12 }}>

          <Text style={styles.title}>
            🎁 Deep Cleaning FREE
          </Text>

          <Text style={styles.sub}>
            1 Time FREE in 6 Months Membership
          </Text>

        </View>

      </View>

      {/* Services */}

      <View style={styles.grid}>

        <View style={styles.item}>
          <MaterialCommunityIcons name="shower" size={24} color="#00A651" />
          <Text style={styles.itemText}>Bathroom</Text>
        </View>

        <View style={styles.item}>
          <MaterialCommunityIcons name="countertop" size={24} color="#00A651" />
          <Text style={styles.itemText}>Kitchen</Text>
        </View>

        <View style={styles.item}>
          <MaterialCommunityIcons name="sofa" size={24} color="#00A651" />
          <Text style={styles.itemText}>Sofa</Text>
        </View>

        <View style={styles.item}>
          <MaterialCommunityIcons name="rug" size={24} color="#00A651" />
          <Text style={styles.itemText}>Carpet</Text>
        </View>

        <View style={styles.item}>
          <MaterialCommunityIcons name="bed" size={24} color="#00A651" />
          <Text style={styles.itemText}>Mattress</Text>
        </View>

        <View style={styles.item}>
          <MaterialCommunityIcons name="office-building" size={24} color="#00A651" />
          <Text style={styles.itemText}>Office</Text>
        </View>

      </View>

      {/* Bottom */}

      <View style={styles.footer}>

        <Text style={styles.price}>
          ₹49 Visit
        </Text>

        <Text style={styles.free}>
          Labour FREE
        </Text>

        <Text style={styles.extra}>
          Chemicals Extra
        </Text>

      </View>

    </Pressable>

  );

}

const styles = StyleSheet.create({

  card:{
    marginHorizontal:16,
    marginTop:18,
    padding:18,

    backgroundColor:"#ECFDF3",

    borderRadius:22,

    elevation:3,
  },

  header:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:18,
  },

  title:{
    fontSize:20,
    fontWeight:"900",
    color:"#111827",
  },

  sub:{
    marginTop:4,
    color:"#64748B",
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
  },

  item:{
    width:"31%",
    alignItems:"center",
    marginBottom:18,
  },

  itemText:{
    marginTop:8,
    fontSize:12,
    fontWeight:"700",
    color:"#111827",
  },

  footer:{
    marginTop:6,

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",
  },

  price:{
    color:"#00A651",
    fontWeight:"900",
    fontSize:15,
  },

  free:{
    color:"#00A651",
    fontWeight:"900",
    fontSize:15,
  },

  extra:{
    color:"#EF4444",
    fontWeight:"700",
    fontSize:12,
  },

});
