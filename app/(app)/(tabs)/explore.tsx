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

export default function ExploreScreen() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("getUsers");

  let content;
  if (isLoading) {
    content = <Text>"Loading..."</Text>;
  } else if (isSuccess) {
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
});
