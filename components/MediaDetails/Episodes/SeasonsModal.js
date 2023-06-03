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
          <ScrollView style={styles.textContainer}>
            {[...Array(numberOfSeasons)].map((_, index) => (
              <Pressable
                onPress={() => {
                  setCurrentSeason(index + 1);
                  setModalVisible(false);
                }}
              >
                <Text key={index} style={styles.season}>
                  Season {index + 1}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

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
    color: "#fff",
    fontFamily: "netflix-regular",
    fontSize: 20,
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
  textContainer: {
    flex: 0,
    gap: 25,
  },
  exit: {
    flex: 0,
  },
});
