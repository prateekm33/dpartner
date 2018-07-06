import DataModel from "./Data.model";
import { Vendor, createVendor } from "./Vendor.model";
import uuid from "uuid/v1";

export class Deal extends DataModel {
  static validProperties = {
    title: { type: String, default: "" },
    short_desc: { type: String, default: "" },
    long_desc: { type: String, default: "" },
    vendor: {
      type: Vendor,
      default: () => new Vendor(),
      verifyValue: value => {
        return value instanceof Vendor ? value : createVendor(value);
      }
    },
    vendor_uuid: { type: Number, default: null },
    code: { type: String, default: "" }
  };
}
export const createDeal = params => new Deal(params);

export class CustomerDeal extends Deal {
  static validProperties = {
    ...Deal.validProperties,
    is_saved: { type: Boolean, default: true },
    is_archived: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    is_used: { type: Boolean, default: false },
    customer_uuid: { type: String, default: () => uuid() }
  };
}
export const createCustomerDeal = params => new CustomerDeal(params);
export const updateCustomerDeal = (my_deal, params) => my_deal.renew(params);
