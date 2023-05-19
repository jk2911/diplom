import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchUser } from "../../store/action-creators/user";
import { useTypesSelector } from "../../hooks/useTypedSelector";
import axios, { AxiosError } from "axios";

export function Login(active: boolean, setActive: any) {
  const [email, setEmail] = useState("");
  const [button, setButton] = useState("Войти");
  const [password, setPassword] = useState("");
  //const { user, loading, error } = useTypesSelector((state) => state.user);
  const [error, setError]=useState("");

  const dispatch = useDispatch();

  const Login = async () => {
    setButton("Вход...")
    try {
      const response = await axios.post(
        "https://localhost:7167/api/Account/Login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      if(response.data.role == "admin")
        window.location.assign("/admin")

      if(response.data.role == "user")
      window.location.assign("/")

      if(response.data.role == "bukmeker")
      window.location.assign("/bukmeker")

    } catch (e: unknown) {
      const error = e as AxiosError;
      // console.log(error.message);
      // console.log(error.response?.data);
      const message = error.response?.data as String;
      setError(message.toString());
      console.log(message)
      //setErrorCreate(message.toString());
    }
    setButton("Войти")
  };

  // useEffect(() => {
  //   if (error == null && loading === false) window.location.assign("/");
  // }, [error, loading]);

  return (
    <Form>
      <StyledInput
        type="text"
        value={email}
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       {/* <StyledInput
        type="text"
        value={error ? error : ""}
        onChange={(e) => setPassword(e.target.value)} 
      /> */}
      <StyledInput
        type="text"
        placeholder="password"
        value={error}
      />
      <button onClick={Login}>Войти</button>
    </Form>
  );
}

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 0%, 0.7) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url("https://yastatic.net/s3/passport-auth-customs/customs/_/4vui26y6.jpg");
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.loginForm};
  box-shadow: 2px 5px 25px -3px ${(props) => props.theme.textShadow};
`;

const StyledInput = styled.input`
  display: flex;
  width: 400px;
  height: 49.48px;
  padding-left: 25px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  /* color: ${(props) => props.theme.white}; */
  /* background: ${(props) => props.theme.inputColor}; */
  border-radius: 15px;
  border: 0;
  box-sizing: border-box;
  /* filter: drop-shadow(2px 5px 25px ${(props) => props.theme.dropShadow});
::placeholder {
  color: ${(props) => props.theme.placeHolder};
  font-size: 20px;
} */
`;
