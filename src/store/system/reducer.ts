import {
  SystemState,
  SystemActionTypes,
  UPDATE_SESSION,
  UserStatus,
  ADD_USER,
  UPDATE_USER,
} from "./types";
import { addUser, updateUser } from "./actions";

const initState: SystemState = {
  loggedIn: false,
  users: [],
};

export function systemReducer(state = initState, action: any) {
  switch (action.type) {
    case UPDATE_SESSION:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_USER:
      let safeUsers = state.users.filter(
        (user) => user.id !== action.payload.id
      );
      return { ...state, users: [...safeUsers, action.payload] };
    case UPDATE_USER:
      let users = state.users.map((user: UserStatus) => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload };
        } else {
          return user;
        }
      });
      return {
        ...state,
        users,
      };
    default:
      return state;
  }
}
