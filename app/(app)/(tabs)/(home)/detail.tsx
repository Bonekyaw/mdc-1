import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
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
import { addCart } from "@/providers/redux/cartSlice";
import Toast from "react-native-root-toast";

const { width, height } = Dimensions.get("window");

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    selectProductById(state, id as string)
  );
  const { cartList } = useAppSelector((state) => state.carts);

  const {
    colors,
    sizes,
    sample,
  }: { colors: Color[]; sizes: Size[]; sample: Sample[] } = useAppSelector(
    (state) => state.requiredInfo
  );

  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  let cartArray: any[] = [];
  if (cartList.length > 0) {
    const list = cartList.find((item: any) => item.id == product.id);
    if (list) {
      cartArray = list.items;
    }
  }

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<any[]>(cartArray);

  const increase = () => {
    if (!selectedColor || !selectedSize) {
      return Toast.show("Please choose color & size.", {
        duration: Toast.durations.LONG,
      });
    }
    setQuantity((q) => q + 1);
  };

  const decrease = () => {
    if (quantity == 1) return;
    setQuantity((q) => q - 1);
  };

  const addToCart = () => {
    if (!selectedColor || !selectedSize) {
      return Toast.show("Please choose color & size.", {
        duration: Toast.durations.LONG,
      });
    }

    setCart((prev) => [
      { id: new Date().getTime(), selectedColor, selectedSize, quantity },
      ...prev,
    ]);
    setQuantity(1);
    // Add To Dedux
    // const cartItem = {
    //   id: product.id,
    //   title: product.title,
    //   price: product.price,
    //   image: product.image,
    //   items: [
    //     ...cart,
    //     { id: new Date().getTime(), selectedColor, selectedSize, quantity },
    //   ],
    // };
    // dispatch(addCart(cartItem));
  };

  const removeCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    // Update To Dedux
    // const cartItem = {
    //   id: product.id,
    //   title: product.title,
    //   price: product.price,
    //   image: product.image,
    //   items: cart.filter((item) => item.id !== id),
    // };
    // dispatch(addCart(cartItem));
  };

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.snapToIndex(1);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = useMemo(() => ["50%", "75%", "100%"], []);

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.1}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  // render
  const renderSheetItem = useCallback(
    ({ item }: any) => (
      <View style={[styles.itemContainer, { width: width - 40 }]}>
        <Text style={{ fontWeight: "bold", opacity: 0.5, textAlign: "left" }}>
          {item.selectedColor.toUpperCase()} - {item.selectedSize} - ( $
          {(product.price * item.quantity).toFixed(2)} )
        </Text>
        <Text>( {item.quantity} )</Text>
        <Pressable onPress={() => removeCart(item.id)}>
          <Ionicons
            name="close-circle"
            size={24}
            color="black"
            style={{ marginLeft: 50 }}
          />
        </Pressable>
      </View>
    ),
    []
  );

  const addCartToRedux = () => {
    if (cart.length == 0) {
      return Toast.show("Please choose color & size.", {
        duration: Toast.durations.LONG,
      });
    }

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      items: cart,
    };
    dispatch(addCart(cartItem));
    router.back();
  };

  const buyNow = () => {
    if (cart.length == 0) {
      return Toast.show("Please choose color & size.", {
        duration: Toast.durations.LONG,
      });
    }

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      items: cart,
    };
    dispatch(addCart(cartItem));
    router.push("/cart");
  };

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
      onPress={handleOpenPress}
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
      onPress={handleOpenPress}
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
          {cart.length > 0 && (
            <Text style={styles.checkTitle}>Order Lists</Text>
          )}
          {cart.length > 0 &&
            cart.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <Text style={{ fontWeight: "bold", opacity: 0.7 }}>
                  {item.selectedColor.toUpperCase()} - {item.selectedSize} - ( $
                  {(product.price * item.quantity).toFixed(2)} )
                </Text>
                <Text>( {item.quantity} )</Text>
              </View>
            ))}
          <View style={{ marginTop: 70 }} />
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Pressable style={styles.button} onPress={addCartToRedux}>
          <Ionicons name="cart-outline" size={20} color="black" />
          <Text style={styles.btnText}>ADD TO CART</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: "black" }]}
          onPress={buyNow}
        >
          <Text style={[styles.btnText, { color: "white" }]}>BUY NOW</Text>
        </Pressable>
      </View>
      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#ffffff" }}
        handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
        backdropComponent={renderBackdrop}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Choose color</Text>
          </View>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Choose size</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Picker
            selectedValue={selectedColor}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedColor(itemValue)
            }
            // mode="dropdown"
            style={{ width: "45%" }}
            itemStyle={{ fontSize: 14, fontWeight: "600" }}
          >
            {colors.map((color) => {
              if (!color.stock) return;
              return (
                <Picker.Item
                  key={color.id}
                  label={color.name}
                  value={color.name}
                />
              );
            })}
          </Picker>
          <Picker
            selectedValue={selectedSize}
            onValueChange={(itemValue, itemIndex) => setSelectedSize(itemValue)}
            // mode="dropdown"
            style={{ width: "45%" }}
            itemStyle={{ fontSize: 14, fontWeight: "600" }}
          >
            {sizes.map((size) => {
              if (!size.stock) return;
              return (
                <Picker.Item
                  key={size.id}
                  label={size.name}
                  value={size.name}
                />
              );
            })}
          </Picker>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View style={styles.resultContainer}>
            {colors.map((item) =>
              item.name === selectedColor ? (
                <ColorBox key={item.id} {...item} />
              ) : null
            )}
            <Text style={{ marginHorizontal: 3 }}>{""}</Text>
            {sizes.map((item) =>
              item.name === selectedSize ? (
                <SizeBox key={item.id} {...item} />
              ) : null
            )}
          </View>
          <View style={styles.resultContainer}>
            <Pressable style={styles.spinner} onPress={increase}>
              <Text style={styles.spinnerText}>+</Text>
            </Pressable>
            <Text style={{ marginHorizontal: 15 }}> {quantity} </Text>
            <Pressable
              style={[styles.spinner, { backgroundColor: "#00000060" }]}
              onPress={decrease}
            >
              <Text style={styles.spinnerText}>-</Text>
            </Pressable>
          </View>
          <Pressable onPress={addToCart}>
            <Ionicons
              name="save"
              size={30}
              color="#007618"
              style={{ marginLeft: 30 }}
            />
          </Pressable>
        </View>
        {cart.length > 0 && (
          <BottomSheetFlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderSheetItem}
            contentContainerStyle={{ zIndex: 1, alignItems: "center" }}
          />
        )}
      </BottomSheet>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  modalTitleContainer: {
    width: "50%",
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
    color: "#000000",
    paddingTop: 7,
    marginHorizontal: 4,
  },
  order: {
    marginVertical: 15,
    fontWeight: "bold",
    opacity: 0.7,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "#00000007",
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 0.5,
    backgroundColor: "#00000007",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginLeft: 10,
    borderRadius: 10,
  },
  colorModal: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: "gray",
  },
  spinner: {
    width: 26,
    height: 26,
    backgroundColor: "#007618",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 5,
  },
  spinnerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  checkTitle: {
    marginTop: 17,
    marginBottom: 10,
    fontSize: 13,
  },
});
