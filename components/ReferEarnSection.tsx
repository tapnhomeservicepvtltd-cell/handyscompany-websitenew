import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ReferEarnSection() {

  return (

    <View style={styles.container}>

      <View style={styles.card}>

        <View style={styles.iconBox}>

          <MaterialCommunityIcons
            name="gift"
            size={46}
            color="#00A651"
          />

        </View>

        <Text style={styles.title}>
          Refer & Earn
        </Text>

        <Text style={styles.subtitle}>
          Invite your friends and earn ₹100 Wallet Cash
          on every successful booking.
        </Text>

        <Pressable style={styles.button}>

          <Text style={styles.buttonText}>
            Invite Friends
          </Text>

        </Pressable>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

container:{
marginHorizontal:16,
marginTop:24,
marginBottom:24,
},

card:{
backgroundColor:"#FFFFFF",
borderRadius:24,
padding:24,
alignItems:"center",

borderWidth:1,
borderColor:"#ECFDF3",

shadowColor:"#000",
shadowOpacity:.05,
shadowRadius:8,
shadowOffset:{
width:0,
height:4,
},
elevation:5,
},

iconBox:{
width:80,
height:80,
borderRadius:40,
backgroundColor:"#ECFDF3",
justifyContent:"center",
alignItems:"center",
marginBottom:18,
},

title:{
fontSize:22,
fontWeight:"900",
color:"#1E293B",
},

subtitle:{
marginTop:10,
fontSize:14,
lineHeight:22,
textAlign:"center",
color:"#64748B",
},

button:{
marginTop:22,
height:50,
paddingHorizontal:34,
borderRadius:16,
backgroundColor:"#00A651",
justifyContent:"center",
alignItems:"center",
},

buttonText:{
color:"#FFFFFF",
fontWeight:"900",
fontSize:16,
},

});