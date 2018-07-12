import React from "react";
import { View } from "react-native";
import { StackNavigator } from "react-navigation";

export const EMPLOYEE_FORM_MODAL_SCREEN_NAMES = {
  NewEmployeeForm: "NewEmployeeForm"
};

export const INITIAL_ROUTE_NAME =
  EMPLOYEE_FORM_MODAL_SCREEN_NAMES.NewEmployeeForm;

const Screens = [
  [
    EMPLOYEE_FORM_MODAL_SCREEN_NAMES.NewEmployeeForm,
    require("./Screens/NewEmployeeForm")
  ]
];

const SCREENS = Screens.reduce(
  (stack, screen) => ({
    [screen[0]]: {
      screen: props => {
        const Component = screen[1];
        Component.default.displayName = screen[0];

        return (
          <View style={{ flex: 1 }}>
            <Component.default {...props} />
          </View>
        );
      }
    },
    ...stack
  }),
  {}
);

const EmployeeFormModalNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME
});
export default EmployeeFormModalNavigator;
