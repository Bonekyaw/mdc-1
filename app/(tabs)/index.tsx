import { Text, View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [count, setCount] = useState(0);
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
