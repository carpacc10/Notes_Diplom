import {
  StyleSheet,
  View,
  TextInput,
  Modal,
  StatusBar,
  TouchableNativeFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import colors from "../misc/colors";
import { useEffect, useState } from "react";
import RoundIconBtn from "./RoundIconBtn";
import { Fonts } from "../misc/fonts";

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChacgeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  const handleSubmit = () => {
    if (title.trim() && !desc.trim()) return onClose();
    else if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />

      <Modal visible={visible} animationType="slide">
        <View style={styles.conteiner}>
          <TextInput
            value={title}
            style={[styles.input, styles.title]}
            placeholder="Название"
            placeholderTextColor={"#524f4f"}
            onChangeText={(text) => handleOnChacgeText(text, "title")}
          />
          <TextInput
            value={desc}
            multiline
            style={[styles.input, styles.desc]}
            placeholder="Текст заметки..."
            placeholderTextColor={"#524f4f"}
            onChangeText={(text) => handleOnChacgeText(text, "desc")}
            textAlignVertical="top"
          />
        </View>
        <View style={styles.btnContainer}>
          <RoundIconBtn antIconName="check" onPress={handleSubmit} />
          {title.trim() || desc.trim() ? (
            <RoundIconBtn antIconName="close" onPress={closeModal} />
          ) : null}
        </View>
        <TouchableNativeFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableNativeFeedback>
      </Modal>
    </>
  );
};

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  conteiner: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  input: {
    color: colors.LIGHT,
    fontFamily: Fonts.RobotoFlex,
  },

  title: {
    height: height / 10,
    marginBottom: 15,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 25,
    fontFamily: Fonts.RobotoFlex,
  },

  desc: {
    height: (height / 100) * 90,
    fontSize: 18,
    fontFamily: Fonts.RobotoFlex,
  },

  modalBG: {
    flex: 1,
    zIndex: -1,
    backgroundColor: colors.DARK,
  },

  btnContainer: {
    position: "absolute",
    gap: 15,
    bottom: 25,
    right: 25,
    zIndex: 1,
  },
});

export default NoteInputModal;
