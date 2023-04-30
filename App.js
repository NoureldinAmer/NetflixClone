import * as React from "react";
import { StyleSheet, View } from "react-native";
import Navigation from "./screens/Navigation";

const App = () => {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
