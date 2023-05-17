import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTypesSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/action-creators/user";
import type {} from "redux-thunk/extend-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../modal/Modal";
import { Login } from "../User/Login";

export function Header() {
  const { user, error, loading } = useTypesSelector((state) => state.user);
  const dispatch = useDispatch();

  const [activeLogin, setActiveLogin] = useState(false);
  const [activeRegistration, setActiveRegistration] = useState(false);

  const navigate = useNavigate();

  const toAdmin = async () => {
    navigate("/admin/regions");
  };
  const toMain = async () => {
    navigate("/");
  };
  const exit = () => {
    window.location.assign("/");
  };

  return (
    <>
      <HeaderContainer>
        <button onClick={toMain}>Главная</button>
        <button>Матчи</button>
        <button>Чемпионаты</button>
        <>
          {user != null ? (
            <>
              {user.email} {user.role}
              {user.role == "user" ? (
                <> {user.money}</>
              ) : (
                <>
                  <button onClick={toAdmin}>Панель Администрирования</button>
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
          {Login(activeLogin, setActiveLogin)}
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
