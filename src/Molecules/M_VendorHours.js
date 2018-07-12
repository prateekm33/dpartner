import React from "react";
import { A_Text, A_View } from "../Atoms";
import moment from "moment";

const M_VendorHours = props => {
  const hours = props.hours || [];
  return (
    <A_View style={[props.containerStyles]}>
      <A_Text strong>Hours</A_Text>
      {hours.length ? (
        hours.map(day => {
          <A_View>
            <A_Text strong>{day.day}</A_Text>
            <A_Text>
              <A_Text>{moment(day.from).format("h:mA")}</A_Text>-<A_Text>
                {moment(day.to).format("h:mA")}
              </A_Text>
            </A_Text>
          </A_View>;
        })
      ) : (
        <A_Text>Not available</A_Text>
      )}
    </A_View>
  );
};

export { M_VendorHours };
