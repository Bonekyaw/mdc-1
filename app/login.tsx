import { StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useForm, Controller } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useSession } from "@/providers/ctx";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Login() {
  const { signIn } = useSession();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (formState: any) => {
    // console.log(formState);
    await signIn(formState);
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
  };

  // const onChange = (arg: any) => {
  //   return {
  //     value: arg.nativeEvent.text,
  //   };
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.row}>
          <Image
            style={styles.image}
            source={require("@/assets/images/react-logo.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <ThemedText style={styles.logoText}>Fashion</ThemedText>
        </ThemedView>
        <ThemedText style={styles.title}>
          Sign in {"\n"}to your Account
        </ThemedText>
        <ThemedText style={[styles.content, { marginBottom: 14 }]}>
          Enter your phone and password to log in
        </ThemedText>
        <ThemedText style={[styles.content, styles.label]}>
          Phone Number
        </ThemedText>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="0977******7"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              inputMode="numeric"
              maxLength={12}
              accessibilityLabel="inputLabel"
              accessibilityHint="inputError"
            />
          )}
          name="phone"
          rules={{ required: true, minLength: 7 }}
        />
        {errors.phone && (
          <ThemedText style={styles.errorText}>
            Invalid Phone Number!
          </ThemedText>
        )}
        <ThemedText style={[styles.content, styles.label]}>
          Password
          <ThemedText style={styles.hintText}>
            {" "}
            ( Must be 8 digits. )
          </ThemedText>
        </ThemedText>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="********"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              inputMode="numeric"
              maxLength={8}
              secureTextEntry
              accessibilityLabel="inputLabel"
              accessibilityHint="inputError"
            />
          )}
          name="password"
          rules={{ required: true, minLength: 8 }}
        />
        {errors.password && (
          <ThemedText style={styles.errorText}>Invalid Password!</ThemedText>
        )}
        <Pressable>
          <ThemedText style={styles.forgetText}>Forgot Password ?</ThemedText>
        </Pressable>
        <Pressable
          style={[styles.input, { backgroundColor: "#2772DA" }]}
          onPress={handleSubmit(onSubmit)}
        >
          <ThemedText style={styles.btnText}>Log In</ThemedText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 5,
  },
  image: {
    width: 20,
    height: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    lineHeight: 46,
  },
  content: {
    marginTop: 11,
    fontSize: 14,
    color: "#00000070",
    fontWeight: "700",
  },
  label: {
    marginTop: 17,
    marginBottom: 3,
  },
  input: {
    backgroundColor: "#ffffff",
    color: "#000",
    borderWidth: 0.5,
    borderColor: "#8C8C8C55",
    fontSize: 15,
    paddingVertical: 17,
    paddingHorizontal: 12,
    borderRadius: 9,
  },
  hintText: {
    fontSize: 14,
    color: "#00000070",
  },
  forgetText: {
    marginTop: 15,
    marginBottom: 24,
    fontSize: 14,
    fontWeight: "700",
    color: "#2772DA",
    textAlign: "right",
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
  errorText: {
    paddingTop: 8,
    fontWeight: "bold",
    color: "#EF4444",
  },
});
