import axios, { AxiosError } from "axios";
import { UserAction, UserActionTypes } from "../../types/user";
import { Dispatch } from "redux";

export const fetchUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER });
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "https://localhost:7167/api/Account/Login",
        data
      );
      dispatch({
        type: UserActionTypes.FETCH_USER_SUCCESS,
        payload: response.data,
      });
      
      const user = response.data;
      console.log(user.token)
      localStorage.setItem("token",user.token.toString());
    } catch (e) {
      const error = e as AxiosError;
      const message = error.response?.data as String;
      dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: message.toString() });
    }
  };
};
