import { createEmployee, updateEmployee } from "../../Models";
import employee_types from "../types/employee.types";

export default {
  employee(state, action) {
    switch (action.type) {
      case employee_types.SAVE_EMPLOYEE_DATA:
        return updateEmployee(state, action.employee);
      case employee_types.LOGGED_OUT_EMPLOYEE:
        return createEmployee();
      default:
        return state || createEmployee();
    }
  }
};
