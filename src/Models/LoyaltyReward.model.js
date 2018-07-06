import DataModel from "./Data.model";
import { Vendor } from "./Vendor.model";
import uuid from "uuid/v1";

export class LoyaltyReward extends DataModel {
  static validProperties = {
    name: { type: String, default: "" },
    short_desc: { type: String, default: "" },
    long_desc: { type: String, default: "" },
    vendor: { type: Vendor, default: () => new Vendor() },
    vendor_uuid: { type: Number, default: null },
    code: { type: String, default: "" }
  };
}
export const createLoyaltyReward = params => new LoyaltyReward(params);

export class CustomerLoyaltyRewardCard extends LoyaltyReward {
  static validProperties = {
    ...LoyaltyReward.validProperties,
    points: { type: Number, default: 0 },
    num_points_redeemed: { type: Number, default: 0 },
    customer_uuid: { type: String, default: () => uuid() }
  };
}
export const createCustomerLoyaltyRewardCard = params =>
  new CustomerLoyaltyRewardCard(params);
export const udpateCustomerLoyaltyRewardCard = (oldCard, params) =>
  oldCard.renew(params);
