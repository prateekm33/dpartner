import React from "react";
import { Image } from "react-native";

const A_Icon = props => {
  if (props.onPress)
    return (
      <A_Button_Opacity onPress={props.onPress}>
        <props.Icon />
      </A_Button_Opacity>
    );
  return <props.Icon />;
};
const A_Icon_View = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/view_icon.png")} />}
  />
);
const A_Icon_Delete = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/delete_icon.png")} />}
  />
);
const A_Icon_Pause = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/pause_icon.png")} />}
  />
);

export { A_Icon_View, A_Icon_Pause, A_Icon_Delete };
