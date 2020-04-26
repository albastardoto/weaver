import { addUser, updateUser, deleteUser } from "./actions";

export interface SystemState {
  loggedIn: boolean;
  users: {
    id: string;
    active: boolean;
    last_changed: Date;
    displayName: string;
  }[];
  userName?: string;
  roomCode?: string;
  userId?: string;
}
export interface UserStatus {
  id: string;
  active: boolean;
  last_changed: Date;
  displayName: string;
}

export const UPDATE_SESSION = "UPDATE_SESSION";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
interface UpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: Partial<SystemState>;
}

export type SystemActionTypes =
  | UpdateSessionAction
  | typeof addUser
  | typeof updateUser
  | typeof deleteUser;
