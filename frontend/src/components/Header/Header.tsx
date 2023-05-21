import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTypesSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/action-creators/user";
import type { } from "redux-thunk/extend-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../modal/Modal";
import { Login } from "../User/Login";
import jwt_decode from "jwt-decode";
import { IToken } from "../../entity/User";
import { Registration } from "../User/Registration";

export function Header() {
  const { user, error, loading } = useTypesSelector((state) => state.user);
  const dispatch = useDispatch();
  const [decoded, setDecoded] = useState<IToken>({ id: "", money: "", email: "", role: "" });

  const [activeLogin, setActiveLogin] = useState(false);
  const [activeRegistration, setActiveRegistration] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const i: IToken = jwt_decode(token);
      setDecoded(i);
    }
  }, []);

  const navigate = useNavigate();

  const toAdmin = async () => {
    navigate("/admin/regions");
  };
  const toMain = async () => {
    navigate("/");
  };
  const exit = () => {
    localStorage.removeItem("token")
    window.location.assign("/");
  };

  const toUser = () => {
    window.location.assign("/user/bets");
  };

  return (
    <>
      <HeaderContainer>
        <>
          {decoded.email != "" ? (
            <>
              {decoded.role == "user" ? (
                <> <button onClick={toMain}>Главная</button> <div>{decoded.money}</div> {" "}</>
              ) : (
                <>
                </>
              )}
              {decoded.role == "admin" ? (
                <> <button onClick={toAdmin}>Панель Администрирования</button></>
              ) : (
                <>
                </>
              )}
              {decoded.role == "bukmeker" ? (
                <> </>
              ) : (
                <>
                </>
              )}
              {decoded.email} {decoded.role}

              {decoded.role == "user" ? (
                <> <button onClick={toUser}>Личный кабинет</button> </>
              ) : (
                <>
                </>
              )}
              <button onClick={exit}>Выйти</button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveLogin(true)}>Войти</button>
              <button onClick={() => setActiveRegistration(true)}>
                Зарегестрироватсья
              </button>
            </>
          )}
        </>
        <Modal active={activeLogin} setActive={setActiveLogin}>
          {Login(activeLogin, setActiveLogin)}
        </Modal>
        <Modal active={activeRegistration} setActive={setActiveRegistration}>
          {Registration(activeLogin, setActiveLogin)}
        </Modal>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 50px;
  color: white;

  background-color: black;
  transition: all 0.5s ease;
`;
