import React from "react";
import { Image, Platform, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreenLists from "./../components/HomeScreenLists";
import MediaDetails from "../components/MediaDetails";
import { SvgUri } from "react-native-svg";
import NetflixLogo from "./../assets/NetflixLogo.svg";
const stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        {/* <HomeScreenLists /> */}
        <stack.Screen
          name="lists"
          component={HomeScreenLists}
          options={{
            title: null,
            headerLeft: () => {
              return <NetflixLogo width={40} height={30} />;
            },
            // headerLeft: () => {
            //   return (
            //     <Image
            //       source={require("./../assets/Netflix-avatar.png")}
            //     />
            //   );
            // },
            statusBarTranslucent: true,
            contentStyle: { backgroundColor: "#000" },
            headerLargeTitleShadowVisible: true,
            headerBlurEffect: "systemUltraThinMaterialDark",
            headerTransparent: true,
            headerTitleAlign: "left",
            headerStyle: {
              height: 50,
              backgroundColor:
                Platform.OS === "android" ? "rgba(18, 18, 18, 0.85)" : null,
            },
            headerTitleStyle: {
              color: "white",
              fontFamily: "netflix-medium",
              fontSize: 25,
            },
          }}
        />
        <stack.Screen
          name="details"
          component={MediaDetails}
          options={{
            contentStyle: { backgroundColor: "transparent" },
            presentation: "modal",
            headerShown: false,
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
