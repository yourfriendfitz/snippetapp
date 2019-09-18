import * as actionTypes from "./actionTypes";
const initialState = {
  isViewing: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SWITCH:
      state.isViewing = !state.isViewing;
      return { ...state, ...payload };

    default:
      return state;
  }
};
