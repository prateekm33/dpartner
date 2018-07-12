import React from "react";
import { A_Text } from "../Atoms";
import moment from "moment";

const M_VendorHours = props => {
  const hours = props.hours || [];
  if (!hours.length) return null;
  return hours.map(day => {
    <View>
      <A_Text strong>{day.day}</A_Text>
      <A_Text>
        <A_Text>{moment(day.from).format("h:mA")}</A_Text>-<A_Text>
          {moment(day.to).format("h:mA")}
        </A_Text>
      </A_Text>
    </View>;
  });
};

export { M_VendorHours };
