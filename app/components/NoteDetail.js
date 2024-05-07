import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../contexts/NoteProvider";
import NoteInputModal from "./NoteInputModel";
import { Fonts } from "../misc/fonts";

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDelail = (props) => {
  const [note, setNote] = useState(props.route.params.note);
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Вы хотите удалить заметку?",
      "Заметка удалится безвозвратно",
      [
        {
          text: "Удалить",
          onPress: deleteNote,
        },
        {
          text: "Отмена",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time;

        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <View style={[styles.ViewBG, StyleSheet.absoluteFillObject]} />
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.time}>
          {note.isUpdated
            ? `Обновлена ${formatDate(note.time)}`
            : `Создана ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn
          antIconName="edit"
          style={{ backgroundColor: colors.PRIMARY }}
          onPress={openEditModal}
        />
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: colors.DARK,
  },

  title: {
    fontSize: 25,
    color: colors.LIGHT,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    marginBottom: 15,
    fontFamily: Fonts.RobotoFlex,
  },

  desc: {
    fontSize: 18,
    color: colors.LIGHT,
    opacity: 0.6,
    fontFamily: Fonts.RobotoFlex,
  },

  time: {
    color: colors.LIGHT,
    opacity: 0.5,
    textAlign: "right",
    fontSize: 12,
    fontFamily: Fonts.RobotoFlex,
  },

  btnContainer: {
    position: "absolute",
    right: 25,
    bottom: 25,
    gap: 15,
  },

  ViewBG: {
    flex: 1,
    zIndex: -1,
    backgroundColor: colors.DARK,
  },
});

export default NoteDelail;
