import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";
import { API_URL } from "@/config";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateCart, deleteCart } from "@/providers/redux/cartSlice";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const CartItem = ({
  id,
  title,
  price,
  image,
  items,
  dispatch,
  onRemove,
}: {
  id: number;
  title: string;
  price: number;
  image: any;
  items: any[];
  dispatch: any;
  onRemove: (id: number, itemId: number, title: string) => void,
}) => {
  const changeCart = (id: number, itemId: number, quantity: number) => {
    if (quantity < 1) {
      return;
    }
    dispatch(
      updateCart({
        id,
        itemId,
        quantity,
      })
    );
  };

  const imageUri = 
  { uri: `${API_URL + image}` };

  return (
    <>
      {items.length > 1 ? (
        items.map((item) => (
          <View style={styles.container} key={item.id}>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <Image
                style={styles.image}
                source={imageUri}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
              <View>
                <Text style={styles.title}>
                  {title.length > 35 ? title.substring(0, 34) + "..." : title}
                </Text>
                <Text style={styles.select}>
                  Color - [ {item.selectedColor} ] & Size - [{" "}
                  {item.selectedSize} ]
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.price}>
                    ${(price * item.quantity).toFixed(2)}
                  </Text>
                  <Pressable style={{ flexDirection: "row" }} onPress={() => onRemove(id, item.id, title)}>
                    <MaterialIcons
                      name="delete-forever"
                      size={20}
                      color="#E06237"
                      style={{ alignSelf: "flex-end" }}
                    />
                    <Text style={styles.delete}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Pressable
                style={styles.spinner}
                onPress={() => changeCart(id, item.id, item.quantity + 1)}
              >
                <Text style={styles.spinnerText}>+</Text>
              </Pressable>
              <Text style={{ marginHorizontal: 15 }}> {item.quantity} </Text>
              <Pressable
                style={[styles.spinner, { backgroundColor: "#00000060" }]}
                onPress={() => changeCart(id, item.id, item.quantity - 1)}
              >
                <Text style={styles.spinnerText}>-</Text>
              </Pressable>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.container}>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <Image
              style={styles.image}
              source={imageUri}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
            <View>
              <Text style={styles.title}>
                {title.length > 35 ? title.substring(0, 34) + "..." : title}
              </Text>
              <Text style={styles.select}>
                Color - [ {items[0].selectedColor} ] & Size - [{" "}
                {items[0].selectedSize} ]
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.price}>
                  ${(price * items[0].quantity).toFixed(2)}
                </Text>
                <Pressable style={{ flexDirection: "row" }} onPress={() => onRemove(id, items[0].id, title)}>
                  <MaterialIcons
                    name="delete-forever"
                    size={20}
                    color="#E06237"
                    style={{ alignSelf: "flex-end" }}
                  />
                  <Text style={styles.delete}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Pressable
              style={styles.spinner}
              onPress={() => changeCart(id, items[0].id, items[0].quantity + 1)}
            >
              <Text style={styles.spinnerText}>+</Text>
            </Pressable>
            <Text style={{ marginHorizontal: 15 }}> {items[0].quantity} </Text>
            <Pressable
              style={[styles.spinner, { backgroundColor: "#00000060" }]}
              onPress={() => changeCart(id, items[0].id, items[0].quantity - 1)}
            >
              <Text style={styles.spinnerText}>-</Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default function CartScreen() {
  const dispatch = useAppDispatch(); // redux
  // const animation = useRef<LottieView>(null);
  // useEffect(() => {
  //   // You can control the ref programmatically, rather than using autoPlay
  //   // animation.current?.play();
  // }, []);

  const carts = useAppSelector((state) => state.carts.cartList);

  let totalAmount = 0;
  if (carts.length > 0) {
    carts.forEach((cart: any) => {
      const total = cart.items.reduce(
        (total: any, item: any) => total + item.quantity,
        0
      );
      totalAmount += total * cart.price;
    });
  }

  if (carts.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          autoPlay
          // ref={animation}
          style={{
            width: 200,
            height: 200,
            // backgroundColor: "#eee",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("@/assets/images/shop/cart_empty.json")}
        />
        <Text style={{ color: "gray", fontWeight: "bold" }}>Empty Cart</Text>
      </View>
    );
  }

  const createTwoButtonAlert = (id: number, itemId: number, title: string) =>
    Alert.alert("Delete it!", `Do you want to delete ${title} from cart?`, [
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Yes", onPress: () => dispatch(deleteCart({id, itemId})) },
    ]);

  return (
    <SafeAreaView>
      <View style={styles.cartContainer}>
        <Text style={styles.currency}>
          $<Text style={styles.total}>{totalAmount.toFixed(2)}</Text>
        </Text>
        <Pressable style={styles.checkOut}>
          <MaterialIcons name="payments" size={24} color="white" />
          <Text style={styles.checkTitle}>Check Out</Text>
        </Pressable>
      </View>
      <FlatList
        data={carts}
        extraData={carts}
        renderItem={({ item }) => <CartItem {...item} dispatch={dispatch} onRemove={createTwoButtonAlert}/>}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    marginVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currency: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007618",
  },
  total: {
    fontSize: 24,
    fontWeight: "bold",
  },
  checkOut: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#157ABE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  checkTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    width: "94%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "auto",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 5,
  },
  image: {
    height: 60,
    aspectRatio: 3 / 4,
    borderRadius: 5,
  },
  title: {
    marginBottom: 3,
  },
  select: {
    color: "gray",
    fontWeight: "700",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#494D4D",
    marginTop: 5,
    marginRight: 20,
  },
  delete: {
    fontSize: 14,
    fontWeight: "700",
    color: "#E06237",
    marginTop: 7,
  },
  spinner: {
    width: 26,
    height: 26,
    backgroundColor: "#4CA049",
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
});