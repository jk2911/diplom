import axios from "axios";
import { UserAction, UserActionTypes } from "../../types/user";
import { Dispatch } from "redux";

export const fetchUsers = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER });
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
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
    } catch (e) {
      dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: "Ошибка" });
    }
  };
};
