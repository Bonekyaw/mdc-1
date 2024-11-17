import { StyleSheet, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { memo } from "react";

import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/providers/redux/userSlice";

type UserType = {
  id: string;
  name: string;
};

export default function ExploreScreen() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUsersQuery("getUsers");

  let content;
  if (isLoading) {
    content = <Text>"Loading..."</Text>;
  } else if (isSuccess) {
    console.log("Users-----", users);
    if (Object.keys(users.entities).length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Data request has failed!</Text>
          <Pressable style={styles.btnError} onPress={refetch}>
            <Text>Try again</Text>
          </Pressable>
        </View>
      );
    }

    // console.log("In expore -----", users);
    const { ids, entities } = users; // ids : ["uuid1", "uuid2",...], entities: {"uuid1": {id: "uuid1", "name": "David22"}, ...}
    content = ids.map((userId: string) => (
      <UserItem key={userId} user={entities[userId]} />
    ));
  } else if (isError) {
    content = <Text>An error occurs.</Text>;
  }

  return <SafeAreaView style={styles.titleContainer}>{content}</SafeAreaView>;
}

const UserItem = memo(({ user }: { user: UserType }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  console.log("User --------", user.id);

  const updateUserClick = async () => {
    try {
      await updateUser({
        id: user.id,
        name: user.name + new Date().getSeconds(),
      }).unwrap();
    } catch (error) {
      console.error("Failed to save the user", error);
    }
  };

  return (
    <Pressable onPress={updateUserClick} style={{ marginVertical: 11 }}>
      <Text style={styles.name}>{user.name}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  titleContainer: {
    height: "100%",
    backgroundColor: "#deeeef",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 3,
  },
  btnError: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
