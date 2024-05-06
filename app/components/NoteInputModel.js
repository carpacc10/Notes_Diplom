import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  StatusBar,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import colors from "../misc/colors";
import { useEffect, useState } from "react";
import RoundIconBtn from "./RoundIconBtn";

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

      <Modal visible={visible} animationType="fade">
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
          <View style={styles.btnContainer}>
            <RoundIconBtn antIconName="check" onPress={handleSubmit} />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn antIconName="close" onPress={closeModal} />
            ) : null}
          </View>
        </View>
        <TouchableNativeFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableNativeFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  input: {
    color: colors.LIGHT,
    fontSize: 20,
  },

  title: {
    height: 50,
    marginBottom: 15,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
  },

  desc: {
    height: "80%",
    /* сделать ширину 100% и добавить абослютное позиционирование для кнопок. так же изменить размер шрифта самой заметки и естественно добавить другой шрифт*/
  },

  modalBG: {
    flex: 1,
    zIndex: -1,
    backgroundColor: colors.DARK,
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    gap: 15,
  },
});

export default NoteInputModal;
