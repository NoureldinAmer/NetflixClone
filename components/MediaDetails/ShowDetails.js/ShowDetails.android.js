import MediaDescription from "../MediaDescription";
import TabNavigation from "../TabNavigation";
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useContext } from "react";
import { WebView } from "react-native-webview";
import { AntDesign } from "@expo/vector-icons";
import VideoPlayerIcon from "../VideoPlayerIcon";
import { MediaContext } from "../../../contexts/MediaContext";
import { useNavigation } from "@react-navigation/native";

const ShowDetails = ({ data, error, loading }) => {
  const webViewRef = useRef(null);
  const { selectedMedia } = useContext(MediaContext);
  const navigation = useNavigation();

  const handleNavigationStateChange = (navState) => {
    if (
      navState.url !==
      `https://www.2embed.to/embed/tmdb/movie?id=${selectedMedia.contentID}`
    ) {
      webViewRef.current?.reload();
      console.log("[RELOADING]");
    }
    webViewRef.current.injectJavaScript(zoomInScript);
  };

  const closeModal = () => {
    webViewRef.current = null;
    navigation.goBack(null);
  };

  const zoomInScript = `
  document.body.style.zoom = '1.5';
  true;
`;

  const clickMiddle = () => {
    const script = `
      (function() {
        const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        if (element) {
          element.click();
        }
      })();`;

    webViewRef.current?.injectJavaScript(script);
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          <View style={{ height: 300, width: "100%" }}>
            <View style={styles.exitButton}>
              <Pressable onPress={closeModal}>
                <VideoPlayerIcon iconSize={28}>
                  <AntDesign name="closecircle" size={28} color="#272526" />
                </VideoPlayerIcon>
              </Pressable>
            </View>
            <WebView
              ref={webViewRef}
              androidHardwareAccelerationDisabled={false}
              style={styles.WebViewContainer}
              source={{
                uri: `https://www.2embed.to/embed/tmdb/movie?id=${selectedMedia.contentID}`,
              }}
              allowsFullscreenVideo={true}
              injectedJavaScript={zoomInScript}
              scalesPageToFit={false}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailsContainer}>
              <MediaDescription clickMiddle={clickMiddle} media={data} />
              <TabNavigation recommendations={data.recommendations} />
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={"large"} color={"red"} />
        </View>
      )}
    </View>
  );
};

export default ShowDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  activityIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    padding: 10,
    gap: 8,
  },
  WebViewContainer: {
    opacity: 0.99, //bug causes app to crash when exiting webview fullscreen, solution:https://github.com/react-native-webview/react-native-webview/issues/811
  },
  exitButton: {
    position: "absolute",
    top: 13,
    right: 13,
    zIndex: 1,
  },
  invisibleWebView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
});
