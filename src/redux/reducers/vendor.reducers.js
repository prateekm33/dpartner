import { createVendor } from "../../Models";
import vendor_types from "../types/vendor.types";
import employee_types from "../types/employee.types";

export default {
  vendor(state, action) {
    switch (action.type) {
      case vendor_types.SAVE_MY_ORG_TO_STORE:
        return action.vendor;
      case employee_types.LOGGED_OUT_EMPLOYEE:
        return createVendor();
      default:
        return state || createVendor();
    }
  }
};
