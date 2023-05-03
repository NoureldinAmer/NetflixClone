import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MediaDetails = ({ route }) => {
  return (
    <View>
      <Text>This is Android</Text>
      <Text>{route.params.contentID}</Text>
      <Text>{route.params.contentType}</Text>
    </View>
  );
};

export default MediaDetails;

const styles = StyleSheet.create({});
