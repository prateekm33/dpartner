import { createVendor } from "../../Models";
import vendor_types from "../types/vendor.types";

export default {
  vendor(state, action) {
    switch (action.type) {
      case vendor_types.SAVE_MY_ORG_TO_STORE:
        return action.vendor;
      default:
        return state || createVendor();
    }
  }
};
