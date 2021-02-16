//Packages
import React, { memo } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const Slide = memo(function Slide({ data }) {
  console.log(data);
  return (
    <View style={styles.slide}>
      <ImageZoom
        cropWidth={windowWidth}
        cropHeight={windowHeight * 0.8}
        imageWidth={windowWidth}
        imageHeight={"100%"}>
        <Image source={{ uri: data.uri }} style={styles.slideImage} />
      </ImageZoom>
      <View style={styles.textContainer}>
        <Text style={styles.slideTitle}>width: {data.width}</Text>
        <Text style={styles.slideSubtitle}>height: {data.height}</Text>
      </View>
    </View>
  );
});

export default Slide;

const styles = StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "pink",
  },
  slideTitle: {
    fontSize: 24,
  },
  slideSubtitle: {
    fontSize: 18,
  },
  textContainer: {
    backgroundColor: "red",
  },
});
