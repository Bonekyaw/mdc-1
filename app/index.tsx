import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'gray' }}>
      <Link href="about">index Screen</Link>
    </View>
  );
}
