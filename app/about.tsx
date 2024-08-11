import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function about() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'orange' }}>
      <Link href="(tabs)">Go to Tabs Screen</Link>
    </View>
  );
}
