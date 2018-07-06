const dispatch = require("../store").dispatch;

export const dispatchErrorActionOfType = type => error => {
  console.warn(`[ERROR] - action: ${type} | error: ${error}`);
  return dispatch({ type, error });
};
