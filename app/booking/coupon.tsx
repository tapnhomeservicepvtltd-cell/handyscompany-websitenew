import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CouponScreen() {

  const router = useRouter();

  const [coupon, setCoupon] = useState("");

  return (

    <SafeAreaView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <Pressable
          onPress={() => router.back()}
        >

          <MaterialCommunityIcons
            name="arrow-left"
            size={26}
            color="#111827"
          />

        </Pressable>

        <Text style={styles.title}>
          Apply Coupon
        </Text>

        <View style={{ width: 26 }} />

      </View>

      {/* Coupon Input */}

      <View style={styles.content}>

        <Text style={styles.heading}>
          Have a Coupon?
        </Text>

        <View style={styles.inputBox}>

          <TextInput
            value={coupon}
            onChangeText={setCoupon}
            placeholder="Enter Coupon Code"
            style={styles.input}
            autoCapitalize="characters"
          />

          <Pressable style={styles.applyButton}>

            <Text style={styles.applyText}>
              Apply
            </Text>

          </Pressable>

        </View>

        {/* Available Coupons */}

        <Text style={styles.offerTitle}>
          Available Offers
        </Text>

        <View style={styles.offerCard}>

          <MaterialCommunityIcons
            name="ticket-percent"
            size={34}
            color="#00A651"
          />

          <View style={{ flex: 1, marginLeft: 12 }}>

            <Text style={styles.offerName}>
              NEW100
            </Text>

            <Text style={styles.offerDesc}>
              ₹100 OFF on Membership
            </Text>

          </View>

          <Pressable>

            <Text style={styles.copy}>
              APPLY
            </Text>

          </Pressable>

        </View>

        <View style={styles.offerCard}>

          <MaterialCommunityIcons
            name="ticket-percent"
            size={34}
            color="#00A651"
          />

          <View style={{ flex: 1, marginLeft: 12 }}>

            <Text style={styles.offerName}>
              FREEVISIT
            </Text>

            <Text style={styles.offerDesc}>
              Free Visit Charge Offer
            </Text>

          </View>

          <Pressable>

            <Text style={styles.copy}>
              APPLY
            </Text>

          </Pressable>

        </View>

      </View>

      {/* Continue */}

      <View style={styles.bottom}>

        <Pressable
          style={styles.button}
          onPress={() =>
            router.push("/booking/summary")
          }
        >

          <Text style={styles.buttonText}>
            Continue
          </Text>

        </Pressable>

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F8FAFC",
},

header:{
height:60,
backgroundColor:"#FFF",
paddingHorizontal:16,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
},

title:{
fontSize:18,
fontWeight:"900",
},

content:{
padding:16,
},

heading:{
fontSize:18,
fontWeight:"900",
},

inputBox:{
marginTop:16,
flexDirection:"row",
},

input:{
flex:1,
height:52,
backgroundColor:"#FFF",
borderRadius:14,
paddingHorizontal:16,
borderWidth:1,
borderColor:"#E5E7EB",
},

applyButton:{
marginLeft:10,
paddingHorizontal:20,
backgroundColor:"#00A651",
justifyContent:"center",
borderRadius:14,
},

applyText:{
color:"#FFF",
fontWeight:"900",
},

offerTitle:{
marginTop:28,
marginBottom:14,
fontSize:18,
fontWeight:"900",
},

offerCard:{
backgroundColor:"#FFF",
padding:18,
borderRadius:18,
flexDirection:"row",
alignItems:"center",
marginBottom:14,
},

offerName:{
fontSize:16,
fontWeight:"900",
},

offerDesc:{
marginTop:4,
fontSize:13,
color:"#64748B",
},

copy:{
color:"#00A651",
fontWeight:"900",
},

bottom:{
padding:16,
backgroundColor:"#FFF",
},

button:{
height:54,
backgroundColor:"#00A651",
borderRadius:16,
justifyContent:"center",
alignItems:"center",
},

buttonText:{
color:"#FFF",
fontSize:16,
fontWeight:"900",
},

});