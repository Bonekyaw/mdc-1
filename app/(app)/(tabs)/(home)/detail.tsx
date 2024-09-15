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
import { Stack, useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";

import Cart from "@/components/shop/Cart";
import ViewPager from "@/components/shop/ViewPager";
import { selectItems } from "@/data";
import { ProductType, Color, Size, Sample } from "@/types";
import {
  fetchProducts,
  updateFavouriteApi,
  selectProductById,
  selectProductIds,
  selectTotalProducts,
  selectAllProducts,
  selectProductEntities,
} from "@/providers/redux/productSlice";
import Toast from "react-native-root-toast";

const { width, height } = Dimensions.get("window");

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    selectProductById(state, id as string)
  );
  const ColorBox = ({
    id,
    name,
    bgColor,
    stock,
  }: {
    id: string;
    name: string;
    bgColor: string;
    stock: boolean;
  }) => (
    <Pressable
      style={[
        styles.circle,
        { backgroundColor: bgColor, borderWidth: 0.2, borderColor: "gray" },
      ]}
    >
      <Ionicons
        name="checkmark"
        size={19}
        color={stock ? (bgColor == "#ffffff" ? "black" : "white") : bgColor}
      />
    </Pressable>
  );
  const SizeBox = ({
    id,
    name,
    stock,
  }: {
    id: string;
    name: string;
    stock: boolean;
  }) => (
    <Pressable
      style={[
        styles.circle,
        stock
          ? { backgroundColor: "#00000090" }
          : { borderWidth: 1, borderColor: "#00000060" },
      ]}
    >
      <Text
        style={[{ fontSize: 10, fontWeight: 600 }, stock && { color: "white" }]}
      >
        {name}
      </Text>
    </Pressable>
  );

  const addToFavourite = async () => {
    try {
      const data = { id: product.id, data: { favourite: !product.favourite } };
      // const data = { id: "abc", data: { favourite: !product.favourite } };
      await dispatch(updateFavouriteApi(data)).unwrap();
    } catch (error: any) {
      Toast.show(error, {
        duration: Toast.durations.SHORT,
      });
    }
  };

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <ViewPager />
        <View style={styles.detailContiner}>
          <View style={[styles.row, styles.brandContainer]}>
            <View style={styles.row}>
              <Text style={styles.brand}>{product.brand}</Text>
              <Ionicons
                name="star"
                size={12}
                color="orange"
                style={{ paddingTop: 1 }}
              />
              <Text style={styles.star}>{product.star}</Text>
              <Text style={styles.quantity}>({product.quantity})</Text>
            </View>
            <Pressable onPress={addToFavourite}>
              <Ionicons
                name={product?.favourite ? "heart" : "heart-outline"}
                size={20}
                color="#E66F2D"
                style={{ paddingTop: 1 }}
              />
            </Pressable>
          </View>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.row}>
            <Text style={styles.price}>{product.price.toFixed(2)}</Text>
            <Text style={styles.discount}>{product.discount.toFixed(2)}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
          <View
            style={
              width > 600
                ? {
                    flexDirection: "row",
                    gap: 40,
                  }
                : { flexDirection: "column" }
            }
          >
            <View>
              <Text style={styles.boxTitle}>Choose Colors</Text>
              <View style={styles.box}>
                {selectItems.colors.map((color) => (
                  <ColorBox key={color.id} {...color} />
                ))}
              </View>
            </View>
            <View>
              <Text style={styles.boxTitle}>Size</Text>
              <View style={styles.box}>
                {selectItems.sizes.map((size) => (
                  <SizeBox key={size.id} {...size} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Pressable style={styles.button}>
          <Ionicons name="cart-outline" size={20} color="black" />
          <Text style={styles.btnText}>ADD TO CART</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: "black" }]}>
          <Text style={[styles.btnText, { color: "white" }]}>BUY NOW</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  detailContiner: {
    marginTop: 17,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
  },
  brandContainer: {
    justifyContent: "space-between",
  },
  brand: {
    color: "gray",
    fontWeight: "600",
    marginRight: 7,
  },
  star: {
    marginHorizontal: 2,
    fontSize: 13,
  },
  quantity: {
    color: "gray",
    fontSize: 13,
  },
  title: {
    marginVertical: 7,
    fontSize: 15,
    fontWeight: "500",
  },
  price: {
    marginRight: 7,
    fontSize: 15,
    color: "#007618",
    fontWeight: "600",
  },
  discount: {
    color: "gray",
    textDecorationLine: "line-through",
  },
  description: {
    marginTop: 15,
    lineHeight: 22,
    opacity: 0.7,
  },
  boxTitle: {
    marginTop: 17,
    marginBottom: 10,
    fontSize: 13,
  },
  box: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 17,
  },
  button: {
    width: width / 2.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    borderWidth: 0.7,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 7,
    backgroundColor: "white",
  },
  btnText: {
    fontWeight: "700",
  },
});
