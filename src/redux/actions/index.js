import { AsyncStorage, PushNotificationIOS } from "react-native";
import loading_types from "../types/loading.types";
import error_types from "../types/error.types";
import notification_types from "../types/notification.types";
import PushNotifications from "../../utils/PushNotifications";
import { saveEmployeeData, getMyOrgAction } from "./employee.actions";
import Api from "../../Api";
import store from "../store";

export const dispatchErrorActionOfType = type => error => {
  console.warn(`[ERROR] - action: ${type} | error: ${error}`);
  return store.dispatch({ type, error });
};

export const loadDataFromStorage = () => {
  return AsyncStorage.getItem("employee").then(stored_employee => {
    if (!stored_employee) {
      return AsyncStorage.setItem("employee", JSON.stringify({}));
    }
    const employee = JSON.parse(stored_employee);
    Api.saveToken(employee.token);
    return employee;
  });
};

export const initAction = () => dispatch => {
  dispatch({ type: loading_types.INITIALIZING_APP, loading: true });
  PushNotifications.init(device_token => {
    dispatch(saveEmployeeData({ device_token }));
  });
  PushNotificationIOS.getDeliveredNotifications(notifications => {
    dispatch(setNotifications(notifications));
  });
  return loadDataFromStorage()
    .then(Api.getEmployee)
    .then(employee => {
      if (employee) {
        dispatch(saveEmployeeData({ ...employee, is_authenticated: true }));
        return dispatch(getMyOrgAction(employee.vendor_uuid)).then(
          () => employee
        );
      }
      return employee;
    })
    .then(employee => {
      dispatch({ type: loading_types.INITIALIZING_APP, loading: false });
      return employee;
    })
    .catch(error => {
      AsyncStorage.setItem("employee", JSON.stringify({}));
      dispatch({ type: loading_types.INITIALIZING_APP, loading: false });
      dispatchErrorActionOfType(error_types.APP_INITIALIZATION_ERROR)(error);
    });
};

export const setNotifications = notifications => {
  return {
    type: notification_types.SET_NOTIFICATIONS,
    notifications: [].concat(notifications)
  };
};

export const addNotifications = notifications => {
  return {
    type: notification_types.ADD_NOTIFICATIONS,
    notifications: [].concat(notifications)
  };
};
