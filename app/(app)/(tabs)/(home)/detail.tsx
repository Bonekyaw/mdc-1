import { View, Text } from "react-native";
import React from "react";
// import { useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

export default function DetailScreen() {
  // const {id} = useLocalSearchParams();
  const product = useAppSelector((state) => state.products.product);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{product.brand} </Text>
      <Text>{product.title} </Text>
      <Text>${product.price} </Text>
      <Text>{product.star} </Text>
      <Text>{product.quantity} </Text>
    </View>
  );
}
