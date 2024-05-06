import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import colors from "../misc/colors";

const SearchBar = () => {
  return (
    <View>
      <TextInput style={styles.searchBar} placeholder="Искать заметку..." />
    </View>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  searchBar: {
    width: width /* Разобраться с этим и шрифтами */,
    height: 40,
    borderRadius: 15,
    paddingLeft: 15,
    backgroundColor: colors.LIGHT,
    fontSize: 20,
    borderWidth: 0.5,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default SearchBar;
