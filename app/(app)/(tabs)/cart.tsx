import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

export default function CartScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        autoPlay
        style={{
          width: 150,
          height: 150,
          // backgroundColor: "#eee",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("@/assets/images/shop/cart_empty.json")}
      />
      <Text>Empty Cart</Text>
    </View>
  );
}
