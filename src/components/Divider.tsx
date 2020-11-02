import React from "react";
import { View, Dimensions } from "react-native";

export default function Divider() {
  return (
    <View
      style={{
        height: 0.5,
        width: Dimensions.get("window").width - 24,
        backgroundColor: "gray",
        marginVertical: 20,
        opacity: 0.1,
      }}
    ></View>
  );
}
