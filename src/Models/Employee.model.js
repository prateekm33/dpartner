import DataModel from "./Data.model";
import phone from "phone";

export class Employee extends DataModel {
  static validProperties = {
    first_name: { type: String, defaultValue: "" },
    last_name: { type: String, defaultValue: "" },
    token: { type: String, default: null },
    is_authenticated: { type: Boolean, default: false },
    phone_number: {
      type: String,
      default: "",
      verifyValue: value => phone(value)[0]
    },
    email: { type: String, defaultValue: "" },
    username: { type: String, defaultValue: "" },
    role: { type: String, defaultValue: "" },
    device_token: { type: String, defaultValue: "" },
    device_uuid: { type: String, defaultValue: "" },
    vendor_uuid: { type: String, defaultValue: "" }
  };

  fullName = () => (this.first_name || "") + (this.last_name || "");
}

export const createEmployee = options => new Employee(options);
export const updateEmployee = (oldEmployee, options) =>
  oldEmployee.renew(options);
