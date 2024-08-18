import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Link, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import Cart from "@/components/shop/Cart";
import Title from "@/components/shop/Title";

export default function HomeScreen() {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <SafeAreaView style={{ minHeight: height, backgroundColor: "#ffffff" }}>
      <View style={styles.container}>
        <Pressable>
          <Image
            style={styles.image}
            source={require("@/assets/images/shop/n.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>
        <Pressable>
          <Cart />
        </Pressable>
      </View>
      <Image
        style={styles.banner}
        source={require("@/assets/images/shop/banner6.png")}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <View style={{ marginTop: 17 }}>
        <Title title="Shop By Category" action="See All"/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 25,
    marginLeft: 15,
  },
  banner: {
    marginTop: 10,
    width: "100%",
    aspectRatio: 20 / 9,
  },
});
