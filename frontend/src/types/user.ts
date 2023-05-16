import { IUser } from "../entity/User";

export interface UserState {
  user: IUser | null;
  loading: boolean;
  error: null | string;
}

export enum UserActionTypes {
  FETCH_USER = "FETCH_USER",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_USER_ERROR = "FETCH_USER_ERROR",
}

interface FetchUsersAction {
  type: UserActionTypes.FETCH_USER;
}

interface FetchUsersSuccesAction {
  type: UserActionTypes.FETCH_USER_SUCCESS;
  payload: IUser;
}

interface FetchUsersErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR;
  payload: string;
}

export type UserAction =
  | FetchUsersAction
  | FetchUsersSuccesAction
  | FetchUsersErrorAction;
