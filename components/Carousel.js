import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  images = [
    "https://thegoodguys.sirv.com/Content/Article%20Images/laundry%20reno%20tips/H1%20Laundry%20Ronnie%20%26%20Georgia-029%20RET.jpg?profile=bce",
    "https://images.wsj.net/im-846148?width=1280&size=1.33333333",
  ];

  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{ borderRadius: 6, width: "94%" }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
