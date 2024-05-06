import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInputModal from "../components/NoteInputModel";
import Note from "../components/Note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../contexts/NoteProvider";

const NoteScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { notes, setNotes } = useNotes();

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const openNote = (note) => {
    navigation.navigate("NoteDelail", { note });
  };

  return (
    <>
      <StatusBar hidden={true} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Заметки</Text>
          {notes.length ? <SearchBar /> : null}
          <FlatList
            data={notes}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 15,
            }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Note onPress={() => openNote(item)} item={item} />
            )}
          />
          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Добавьте заметку</Text>
            </View>
          ) : null}
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        antIconName="plus"
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      />
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.DARK,
    zIndex: 1,
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 10,
    alignSelf: "center",
  },

  emptyHeader: {
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: colors.LIGHT,
    opacity: 0.2,
  },

  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    /* Изменить цвет фона */
    zIndex: -1,
  },

  addBtn: {
    position: "absolute",
    right: 25,
    bottom: 25,
    zIndex: 1,
  },
});

export default NoteScreen;
