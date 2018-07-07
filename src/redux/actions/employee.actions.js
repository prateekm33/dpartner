import { AsyncStorage } from "react-native";
import Api from "../../Api";
import employee_types from "../types/employee.types";
import error_types from "../types/error.types";
import loading_types from "../types/loading.types";
import vendor_types from "../types/vendor.types";
import { dispatchErrorActionOfType } from ".";

export const loginAction = creds => (dispatch, getState) => {
  dispatch({ type: loading_types.LOGGING_IN_EMPLOYEE, loading: true });
  return Api.loginEmployee(creds)
    .then(employee => {
      dispatch({ type: loading_types.LOGGING_IN_EMPLOYEE, loading: false });
      dispatch({ type: employee_types.LOGGED_IN_EMPLOYEE, employee });
      dispatch(saveEmployeeData(employee));
      dispatch(getMyOrgAction(employee.vendor_uuid));
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
      dispatch(getMyOrgAction(employee.vendor_uuid));
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

export const getMyOrgAction = vendor_uuid => dispatch => {
  dispatch({ type: loading_types.FETCHING_MY_ORG, loading: true });
  return Api.getMyOrganization(vendor_uuid)
    .then(vendor => {
      dispatch({ type: loading_types.FETCHING_MY_ORG, loading: false });
      dispatch({ type: vendor_types.SAVE_MY_ORG_TO_STORE, vendor });
      return vendor;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_MY_ORG, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_MY_ORG_ERROR)(error);
      return false;
    });
};

export const getOrgEmployeesAction = () => dispatch => {
  dispatch({ type: loading_types.FETCHING_ORG_EMPLOYEES, loading: true });
  return Api.getEmployee()
    .then(employees => {
      dispatch({ type: loading_types.FETCHING_ORG_EMPLOYEES, loading: false });
      return employees;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_ORG_EMPLOYEES, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_ORG_EMPLOYEES_ERROR)(
        error
      );
      return false;
    });
};

export const updateEmployeeAction = (employee, updates) => dispatch => {
  dispatch({ type: loading_types.UPDATING_EMPLOYEE, loading: true });
  return Api.updateEmployee(updates, employee)
    .then(employee => {
      dispatch({ type: loading_types.UPDATING_EMPLOYEE, loading: false });
      return employee;
    })
    .catch(error => {
      dispatch({ type: loading_types.UPDATING_EMPLOYEE, loading: false });
      dispatchErrorActionOfType(error_types.UPDATING_EMPLOYEE_ERROR)(error);
      return false;
    });
};
