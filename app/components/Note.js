import { StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import colors from "../misc/colors";
import { Fonts } from "../misc/fonts";

const Note = ({ item, onPress }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.conteiner}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.desc} numberOfLines={3}>
        {desc}
      </Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: colors.DeepDARK,
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.LIGHT,
    fontFamily: Fonts.RobotoFlex,
  },

  desc: {
    color: colors.LIGHT,
    opacity: 0.5,
    fontFamily: Fonts.RobotoFlex,
  },
});

export default Note;
