import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function BottomCTA() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>

      <LinearGradient
        colors={["#00A651", "#008C45"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >

        {/* Left */}

        <View>

          <Text style={styles.price}>
            ₹699
          </Text>

          <Text style={styles.plan}>
            6 Months Membership
          </Text>

          <Text style={styles.subtitle}>
            ₹49 Visit • Labour FREE
          </Text>

        </View>

        {/* Button */}

        <Pressable
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

        </Pressable>

      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({

  wrapper:{
    position:"absolute",
    left:0,
    right:0,
    bottom:0,
    padding:14,
    backgroundColor:"#FFFFFF",
    borderTopWidth:1,
    borderColor:"#F1F5F9",
  },

  card:{
    borderRadius:22,
    padding:18,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",

    shadowColor:"#00A651",
    shadowOpacity:.25,
    shadowRadius:12,
    shadowOffset:{
      width:0,
      height:5,
    },

    elevation:10,
  },

  price:{
    color:"#FFFFFF",
    fontSize:34,
    fontWeight:"900",
  },

  plan:{
    color:"#FFFFFF",
    fontSize:16,
    fontWeight:"800",
  },

  subtitle:{
    color:"#DDF7E8",
    marginTop:3,
    fontSize:12,
  },

  button:{
    backgroundColor:"#FFFFFF",
    borderRadius:16,
    paddingHorizontal:20,
    paddingVertical:14,
    flexDirection:"row",
    alignItems:"center",
  },

  buttonText:{
    color:"#00A651",
    fontWeight:"900",
    fontSize:16,
    marginRight:8,
  },

});