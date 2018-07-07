import React from "react";
import { Image } from "react-native";
import { A_Button_Opacity } from "./A_Button";

const A_Icon = props => {
  if (props.onPress)
    return (
      <A_Button_Opacity onPress={props.onPress}>{props.Icon}</A_Button_Opacity>
    );
  return props.Icon;
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
const A_Icon_Dashboard = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/pause_icon.png")} />}
  />
);
const A_Icon_Manage = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/pause_icon.png")} />}
  />
);
const A_Icon_Scan = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/pause_icon.png")} />}
  />
);
const A_Icon_Profile = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/pause_icon.png")} />}
  />
);

const A_Icon_Close = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/pause_icon.png")} />}
  />
);
const A_Icon_DropdownToggle = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/pause_icon.png")} />}
  />
);

export {
  A_Icon_View,
  A_Icon_Pause,
  A_Icon_Delete,
  A_Icon_Dashboard,
  A_Icon_Manage,
  A_Icon_Scan,
  A_Icon_Profile,
  A_Icon_Close,
  A_Icon_DropdownToggle
};
