import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppSelector } from "@/hooks/useRedux";
import { selectCount } from "@/providers/redux/cartSlice";

export default function Cart() {
  const count = useAppSelector(selectCount);
  return (
    <View style={{ flexDirection: 'row' }}>
      <Ionicons name="cart-outline" size={24} color="black" />
      <View style={styles.container}>
        <Text style={styles.badge}>{count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
    marginTop: -5,
  },
  badge: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
