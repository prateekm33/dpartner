import DataModel from "./Data.model";
import phone from "phone";
import { Vendor, createVendor } from "./Vendor.model";
import { USER_ROLES } from "../utils/constants";

export class Employee extends DataModel {
  static validProperties = {
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    is_authenticated: { type: Boolean, default: false },
    phone_number: {
      type: String,
      default: "",
      verifyValue: value => phone(value)[0]
    },
    email: { type: String, default: "" },
    username: { type: String, default: "" },
    role: { type: String, default: "" },
    device_token: { type: String, default: "" },
    device_uuid: { type: String, default: "" },
    vendor_uuid: { type: String, default: "" },
    vendor: {
      type: Vendor,
      default: () => createVendor()
    }
  };

  fullName = () => (this.first_name || "") + (this.last_name || "");

  isAccountAdmin = () => isAccountAdmin(this.role);
}

export const createEmployee = options => new Employee(options);
export const updateEmployee = (oldEmployee, options) =>
  oldEmployee.renew(options);

export const isAccountAdmin = role =>
  role === USER_ROLES.VENDOR_ADMIN || role === USER_ROLES.VENDOR_ACCOUNT_OWNER;
