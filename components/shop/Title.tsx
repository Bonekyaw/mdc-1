import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function Title({
  title,
  action,
}: {
  title: string;
  action: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{title}</Text>
      <Pressable>
        <Text style={styles.action}>{action}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 15,
    marginRight: 20,
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
  },
  action: {
    color: "gray",
    fontWeight: "500",
  },
});

// type titleProps = {
//   title: string;
//   action: string;
// };

// const Title : React.FC<titleProps> = ({ title, action }) => (
//   <View style={styles.container}>
//     <Text style={styles.category}>{title}</Text>
//     <Pressable>
//       <Text style={styles.action}>{action}</Text>
//     </Pressable>
//   </View>
// );

// const Title : React.FC<{titlePs: titleProps}> = ({ titlePs}) => (
//     <View style={styles.container}>
//       <Text style={styles.category}>{titlePs.title}</Text>
//       <Pressable>
//         <Text style={styles.action}>{titlePs.action}</Text>
//       </Pressable>
//     </View>
//   );

// export default function Title({ title, action }: titleProps) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.category}>{title}</Text>
//       <Pressable>
//         <Text style={styles.action}>{action}</Text>
//       </Pressable>
//     </View>
//   );
// }
