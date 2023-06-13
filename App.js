import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Navigation from "./screens/Navigation";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { ApiProvider } from "./contexts/ApiContext";
import { init, deleteDB } from "./util/database";
import SplashScreen from "./screens/SplashScreen";

const App = () => {
  const [dbInit, setDbInit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    "netflix-bold": require("./assets/fonts/NetflixSans-Bold.otf"),
    "netflix-light": require("./assets/fonts/NetflixSans-Light.otf"),
    "netflix-medium": require("./assets/fonts/NetflixSans-Medium.otf"),
    "netflix-regular": require("./assets/fonts/NetflixSans-Regular.otf"),
  });

  const finishLoading = () => {
    setIsLoading(false);
  };

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  // if (!dbInit) {
  //   return <AppLoading />;
  // }

  useEffect(() => {
    const initialiseDB = async () => {
      try {
        const result = await init();
        console.log("result of db: ", result);
        setDbInit(true);
      } catch (error) {
        console.log(error);
      }
    };

    initialiseDB();
  });

  // useEffect(() => {
  //   deleteDB()
  //     .then(() => {
  //       setDbInit(true);
  //       console.log("db init");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <ApiProvider>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        {isLoading ? (
          <SplashScreen
            finishLoading={finishLoading}
            isDBInitialized={dbInit}
            areFontsLoaded={fontsLoaded}
          />
        ) : (
          <Navigation />
        )}
      </View>
    </ApiProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
