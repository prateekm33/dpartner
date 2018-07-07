import { AsyncStorage } from "react-native";
import Api from "../../Api";
import employee_types from "../types/employee.types";
import error_types from "../types/error.types";
import loading_types from "../types/loading.types";
import { dispatchErrorActionOfType } from ".";

export const loginAction = creds => (dispatch, getState) => {
  dispatch({ type: loading_types.LOGGING_IN_EMPLOYEE, loading: true });
  return Api.loginEmployee(creds)
    .then(employee => {
      dispatch({ type: loading_types.LOGGING_IN_EMPLOYEE, loading: false });
      dispatch({ type: employee_types.LOGGED_IN_EMPLOYEE, employee });
      dispatch(saveEmployeeData(employee));
      return Api.registerDeviceToken(getState().employee.device_token)
        .then(() => employee)
        .catch(() => {
          console.warn("-----ERROR REGISTERING DEVICE TOKEN", employee);
          return employee;
        });
    })
    .catch(error => {
      dispatch({ type: loading_types.LOGGING_IN_EMPLOYEE, loading: false });
      dispatchErrorActionOfType(error_types.LOGIN_EMPLOYEE_ERROR)(error);
      return false;
    });
};

export const signupAction = creds => dispatch => {
  dispatch({ type: loading_types.SIGNING_UP_EMPLOYEE, loading: true });
  return Api.signupEmployee(creds)
    .then(employee => {
      dispatch({ type: loading_types.SIGNING_UP_EMPLOYEE, loading: false });
      dispatch({ type: employee_types.SIGNED_UP_EMPLOYEE, employee });
      dispatch(saveemployeeData(employee));
      return Api.registerDeviceToken(getState().employee.device_token)
        .then(() => employee)
        .catch(() => {
          console.warn("-----ERROR REGISTERING DEVICE TOKEN");
          return employee;
        });
    })
    .catch(error => {
      dispatch({ type: loading_types.SIGNING_UP_EMPLOYEE, loading: false });
      dispatchErrorActionOfType(error_types.SIGNUP_EMPLOYEE_ERROR)(error);
      return false;
    });
};

export const saveEmployeeData = employee => {
  const _employee = {
    uuid: employee.uuid,
    device_token: employee.device_token,
    email: employee.email,
    vendor_uuid: employee.vendor_uuid
  };
  if (employee.token) _employee.token = employee.token;
  AsyncStorage.mergeItem("employee", JSON.stringify(_employee));
  return {
    type: employee_types.SAVE_EMPLOYEE_DATA,
    employee
  };
};
