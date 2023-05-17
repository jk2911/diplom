import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchUser } from "../../store/action-creators/user";
import { useTypesSelector } from "../../hooks/useTypedSelector";

export function Login(active: boolean, setActive: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, error } = useTypesSelector((state) => state.user);
  console.log(user);
  console.log(error);

  const dispatch = useDispatch();

  const Login = () => {
    dispatch(fetchUser(email, password));
    if (user != null) {
        setActive(false);
      }
  };

  

  return (
    <Form>
      <StyledInput
        type="email"
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
      <StyledInput
        type="text"
        value={error ? error : ""}
        onChange={(e) => setPassword(e.target.value)}
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
