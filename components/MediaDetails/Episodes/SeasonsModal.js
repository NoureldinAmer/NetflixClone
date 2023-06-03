import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
export default function SeasonsModal({
  modalVisible,
  setModalVisible,
  numberOfSeasons,
  setCurrentSeason,
  currentSeason,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <BlurView
        style={styles.modalContainer}
        tint="dark"
        intensity={Platform.OS === "ios" ? 65 : 119}
      >
        <View style={styles.modalView}>
          <View style={{ flex: 1, backgroundColor: "green" }} />
          <ScrollView
            style={styles.seasonsContainer}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            contentContainerStyle={{ marginTop: 50 }}
          >
            {[...Array(numberOfSeasons)].map((_, index) => (
              <Pressable
                style={styles.textContainer}
                onPress={() => {
                  setCurrentSeason(index + 1);
                  setModalVisible(false);
                }}
              >
                <Text
                  key={index}
                  style={[
                    styles.season,
                    index + 1 === currentSeason
                      ? styles.seasonSelected
                      : styles.season,
                  ]}
                >
                  Season {index + 1}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={{ flex: 1, backgroundColor: "green" }} />

          <Pressable style={styles.exit} onPress={() => setModalVisible(false)}>
            <Ionicons name="md-close-circle" size={65} color="white" />
          </Pressable>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  season: {
    color: "#949593",
    fontFamily: "netflix-regular",
    fontSize: 30,
    textAlign: "center",
  },
  seasonSelected: {
    color: "#fff",
    fontSize: 33.5,
    textAlign: "center",
    fontFamily: "netflix-medium",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },

  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  seasonsContainer: {
    marginBottom: 120,

    maxHeight: "90%",
  },
  textContainer: {
    marginTop: 25,
  },
  exit: {
    flex: 0,
    position: "absolute",
    bottom: 45,
  },
});
