import * as actionTypes from "./actionTypes";
const switchAction = (payload = {}) => ({
  type: actionTypes.SWITCH,
  payload
});
export { switchAction };
