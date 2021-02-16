// Packages
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Carousel from "./components/Carousel";

import * as ScreenOrientation from "expo-screen-orientation";
ScreenOrientation.unlockAsync();

export default function App() {
  const initialSlideList = [];
  const [slideList, setSlideList] = useState(initialSlideList);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      const newResult = { ...result, id: Math.random() };
      setSlideList((prevArray) => [...prevArray, newResult]);
    }
  };

  return (
    <View style={styles.container}>
      <Carousel slideList={slideList} />
      <View style={styles.pickImageButton}>
        <Button title='Pick an image from camera roll' onPress={pickImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pickImageButton: {
    paddingBottom: 8,
  },
});
