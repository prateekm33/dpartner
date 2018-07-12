import { getResponsiveCSSFrom8 } from "../utils";

export const WEIGHT = {
  BOLD: "800"
};

export const DEFAULT_CARD_SHADOW = {
  shadowRadius: getResponsiveCSSFrom8(5).width,
  shadowColor: "lightgrey",
  shadowOpacity: 1,
  shadowOffset: {
    width: 0,
    height: 0
  }
};
