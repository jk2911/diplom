import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTypesSelector } from "../../hooks/useTypedSelector";
import { fetchUser } from "../../store/action-creators/user";
import axios, { AxiosError } from "axios";

export function Registration(active: boolean, setActive: any) {
  const [button, setButton] = useState("Зарегестрироватсья");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgaion] = useState("");
  const [error, setError] = useState("");

  const Registration = async () => {
    setButton("Регистрация...");

    if (password != passwordAgain)
      setError("Пароли не совпадают")

    try {
      const response = await axios.post(
        "https://localhost:7167/api/Account/Register",
        { email, password }
      );
      const user = response.data;
      console.log(user)
      localStorage.setItem("token", user.token);
      window.location.assign("/");
    } catch (e: unknown) {
      const error = e as AxiosError;
      const message = error.response?.data as String;
      console.log(message.toString());
      setError(message.toString());
    }
    
    setButton("Зарегестрироватсья");
  };



  return (
    <Form>
      <RegDiv>Регистрация</RegDiv>
      <StyledInput
        type="email"
        value={email}
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="Повторите пароль"
        value={passwordAgain}
        onChange={(e) => setPasswordAgaion(e.target.value)}
      />
      <div style={{
        width: "400px",
        height: "49.48px"
      }}>{error}</div>
      <StyledButton onClick={Registration}>{button}</StyledButton>
    </Form>
  );
}

const RegDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: 'Montserrat-Bold';
  font-size: 18px;
`

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
  `;

const StyledInput = styled.input`
    display: flex;
    width: 400px;
    height: 49.48px;
    padding-left: 25px;
    margin-bottom: 20px;
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

const StyledButton = styled.button`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 56px;
  padding-left: 60px;
  padding-right: 60px;
  font-size: 18px;
  font-family: 'Montserrat-Bold';
  text-align: center;
  border: none;
  :hover {
    cursor: pointer;
  }
  transition-duration: 0.4s;
`