import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type ProductProps = {
  id: number;
  brand: string;
  title: string;
  star: number;
  quantity: number;
  price: number;
  discount: number;
  image: any;
  favourite: boolean;
};

export default function Product({
  id,
  brand,
  title,
  star,
  quantity,
  price,
  discount,
  image,
  favourite,
}: ProductProps) {
  return (
    <View style={styles.container}>
      <Pressable>
        <ImageBackground
          source={image}
          style={styles.imageView}
          imageStyle={styles.image}
        >
          <Pressable>
            <View style={styles.heartContainer}>
              <Ionicons name="heart-outline" size={18} color="#E66F2D" />
            </View>
          </Pressable>
        </ImageBackground>
      </Pressable>
      <View style={styles.brandContainer}>
        <Text style={styles.brand}>{brand}</Text>
        <Ionicons
          name="star"
          size={12}
          color="orange"
          style={{ paddingTop: 1 }}
        />
        <Text style={styles.star}>{star}</Text>
        <Text style={styles.quantity}>({quantity})</Text>
      </View>
      <Text style={styles.title}>
        {title.length > 25 ? title.substring(0, 25) + "..." : title}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <Text style={styles.discount}>${discount.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 17,
  },
  imageView: {
    width: 200,
    height: 250,
    resizeMode: "cover",
    alignItems: "flex-end",
  },
  image: {
    borderRadius: 5,
  },
  heartContainer: {
    backgroundColor: "#00000015",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginRight: 12,
  },
  brandContainer: {
    flexDirection: "row",
    marginTop: 10,
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
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    marginRight: 7,
    color: '#007618',
    fontSize: 15,
    fontWeight: '500',
  },
  discount: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
});
