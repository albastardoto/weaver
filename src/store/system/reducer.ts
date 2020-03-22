import { SystemState, SystemActionTypes, UPDATE_SESSION } from "./types";

const initState: SystemState = {
  loggedIn: false
};

export function systemReducer(state = initState, action: SystemActionTypes) {
  switch (action.type) {
    case UPDATE_SESSION:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
