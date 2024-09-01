import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";
import { useScrollToTop } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProduct } from "@/providers/redux/productSlice";

import Cart from "@/components/shop/Cart";
import Title from "@/components/shop/Title";
import Category from "@/components/shop/Category";
import Product from "@/components/shop/Product";
import { categories, products } from "@/data";

const blurhash =
"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function HomeScreen() {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const [select, setSelect] = useState("Men");
  const [data, setData] = useState(products);
  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onSelectHandler = (name: string) => {
    setSelect(name);
  };

  const onPressToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  const saveProductToRedux = (item: any) => {
    dispatch(setProduct(item));
    router.navigate('/detail');
  };

  return (
    <SafeAreaView style={{ minHeight: height, backgroundColor: "#ffffff" }}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Pressable onPress={onPressToTop}>
          <Image
            style={styles.image}
            source={require("@/assets/images/shop/n.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>
        <Pressable onPress={() => router.navigate('/cart')}>
          <Cart />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        <Image
          style={styles.banner}
          source={require("@/assets/images/shop/banner6.png")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View style={{ marginLeft: 20 }}>
          <Title title="Shop By Category" action="See All" />
          <FlashList
            data={categories}
            extraData={select}
            horizontal
            renderItem={({ item }) => (
              <Category {...item} onSelect={onSelectHandler} select={select} />
            )}
            estimatedItemSize={80}
            showsHorizontalScrollIndicator={false}
          />
          <Text>{""}</Text>
          <Title title="Recommended for You" action="See All" />
          <FlashList
            data={data[select as keyof typeof data]}
            horizontal
            renderItem={({ item }) => <Product {...item} onCall={() => saveProductToRedux(item)}/>}
            estimatedItemSize={80}
            showsHorizontalScrollIndicator={false}
          />
          <Title title="Popular Lists for You" action="See All" />
          <FlashList
            data={data[select as keyof typeof data]}
            horizontal
            renderItem={({ item }) => <Product {...item} onCall={() => saveProductToRedux(item)}/>}
            estimatedItemSize={80}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 25,
    marginLeft: 15,
  },
  banner: {
    width: "100%",
    aspectRatio: 20 / 9,
  },
});
