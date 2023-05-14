import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import React from "react";

const SearchTextInput = () => {
  return (
    <TextInput
      style={styles.input}
      inputMode="search"
      placeholder="useless placeholder"
      keyboardAppearance="dark"
      left={<TextInput.Icon icon="magnify" disabled />}
    />
  );
};

export default SearchTextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#323232",
    color: "#C4C4C4",
    Size: 15.21,
    //padding: 20,
  },
});
