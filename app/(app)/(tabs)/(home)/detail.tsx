import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import Cart from "@/components/shop/Cart";
import ViewPager from "@/components/shop/ViewPager";

export default function DetailScreen() {
  // const {id} = useLocalSearchParams();
  const product = useAppSelector((state) => state.products.product);

  return (
    <View>
      <Stack.Screen
        options={{
          headerBackTitle: "Home",
          headerTitle: "Product Detail",
          headerTintColor: "black",
          headerStyle: { backgroundColor: "white" },
          headerRight: () => (
            <Pressable>
              <Cart />
            </Pressable>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <ViewPager />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
});
