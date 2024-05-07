import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import colors from "../misc/colors";
import { AntDesign } from "@expo/vector-icons";
import { Fonts } from "../misc/fonts";

const SearchBar = ({ value, onClear, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder="Искать заметку..."
      />
      {value ? (
        <AntDesign
          name="close"
          size={20}
          color={colors.PRIMARY}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginBottom: 20,
  },

  searchBar: {
    width: width,
    height: 40,
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.LIGHT,
    fontSize: 18,
    borderWidth: 0.5,
    alignSelf: "center",
    fontFamily: Fonts.RobotoFlex,
  },

  clearIcon: {
    position: "absolute",
    right: 10,
  },
});

export default SearchBar;
