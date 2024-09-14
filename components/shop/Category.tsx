import { Pressable, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Category({
  id,
  name,
  image,
  onSelect,
  select,
}: {
  id: string;
  name: string;
  image: any;
  onSelect: (name: string) => void,
  select: string,
}) {
  return (
    <Pressable style={styles.container} onPress={() => onSelect(id)}>
      <Image
        style={[styles.image, select === id && styles.select]}
        source={image}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 30,
  },
  image: {
    width: 55,
    height: 55,
    marginBottom: 7,
  },
  select: {
    borderRadius: 27,
    borderColor: 'orange',
    borderWidth: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
