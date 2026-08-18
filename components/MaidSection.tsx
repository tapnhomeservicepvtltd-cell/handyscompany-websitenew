import React from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { homeMaidServices } from "@/data/maid";

export default function MaidSection() {

  const router = useRouter();

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View>

          <Text style={styles.title}>
            👩 Maid & Housekeeping
          </Text>

          <Text style={styles.subTitle}>
            Verified Maids for Home & Office
          </Text>

        </View>

        <Pressable
          onPress={() =>
            router.push("/category/maid")
          }
        >

          <Text style={styles.viewAll}>
            View All
          </Text>

        </Pressable>

      </View>

      <FlatList
        horizontal
        data={homeMaidServices}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal:16,
        }}

        renderItem={({ item }) => (

          <Pressable
            style={styles.card}
            onPress={() =>
              router.push(item.route as any)
            }
          >

            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    item.color + "15",
                },
              ]}
            >

              <MaterialCommunityIcons
                name={item.icon as any}
                size={30}
                color={item.color}
              />

            </View>

            <Text
              numberOfLines={2}
              style={styles.service}
            >
              {item.title}
            </Text>

            <Text style={styles.price}>
              Starting ₹999
            </Text>

          </Pressable>

        )}

      />

    </View>

  );

}

const styles = StyleSheet.create({

container:{
marginTop:20,
},

header:{
marginHorizontal:16,
marginBottom:14,

flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
},

title:{
fontSize:20,
fontWeight:"900",
color:"#111827",
},

subTitle:{
marginTop:3,
fontSize:12,
color:"#64748B",
},

viewAll:{
color:"#00A651",
fontWeight:"800",
},

card:{
width:165,
marginRight:14,

backgroundColor:"#FFF",

borderRadius:20,

padding:18,

elevation:3,
},

iconBox:{
width:60,
height:60,

borderRadius:30,

justifyContent:"center",
alignItems:"center",
},

service:{
marginTop:14,

fontSize:14,

fontWeight:"800",

color:"#111827",

minHeight:40,
},

price:{
marginTop:12,

fontWeight:"900",

color:"#00A651",
},

});
