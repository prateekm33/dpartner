import React from "react";
import { Image } from "react-native";

export const A_Image = props => {
  return (
    <Image
      {...props}
      source={props.source || require("../assets/pause_icon.png")} // TODO...replace with empty_image.png
    />
  );
};
