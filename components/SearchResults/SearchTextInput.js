import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const SearchTextInput = ({
  placeholder = "Search for titles, genres or people",
  value,
  onChangeText,
  handelReset,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Fontisto
        name="search"
        size={18}
        color="gray"
        style={styles.searchIconStyle}
      />
      <TextInput
        style={styles.input}
        inputMode="search"
        placeholder={placeholder}
        keyboardAppearance="dark"
        placeholderTextColor={"#7B7B7B"}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
      />
      {value && (
        <Pressable onPress={handelReset}>
          <AntDesign
            name="closecircle"
            size={15}
            color="gray"
            style={styles.closeIconStyle}
          />
        </Pressable>
      )}
    </View>
  );
};

export default SearchTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#323232",
  },
  searchIconStyle: {
    paddingVertical: 9,
    paddingLeft: 11,
    paddingRight: 14,
  },
  closeIconStyle: {
    paddingRight: 11,
    paddingLeft: 3,
    paddingVertical: 3,
  },
  input: {
    color: "#C4C4C4",
    paddingVertical: 8,
    flex: 1,
    fontSize: 15,
  },
});
