import { Text, View, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useNavigation } from "expo-router";

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>{count}</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            setCount((prev) => prev + 1);
          }}
        >
          <Text style={styles.btnText}>Increase</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setCount((prev) => prev - 1);
          }}
        >
          <Text style={styles.btnText}>Decrease</Text>
        </Pressable>
      </View>
      <Link href="../../product">Go to Product Tab</Link>
      <Link href="detail">Go to Detail Screen</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 200,
    marginHorizontal: "auto",
    backgroundColor: "#deeeef",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1CFCB3",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 17,
    marginBottom: 3,
  },
  btnText: {
    fontSize: 16,
  },
});
