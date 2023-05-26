import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTypesSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/action-creators/user";
import type { } from "redux-thunk/extend-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../../modal/Modal";
import { Login } from "../User/Login";
import jwt_decode from "jwt-decode";
import { IToken } from "../../entity/User";
import { Registration } from "../User/Registration";
import Text from "../UI/Text";

export function Header() {
  const { user, error, loading } = useTypesSelector((state) => state.user);
  var token = null;
  const dispatch = useDispatch();
  const [decoded, setDecoded] = useState<IToken>({
    id: "",
    money: "",
    email: "",
    role: "",
  });

  const [activeLogin, setActiveLogin] = useState(false);
  const [activeRegistration, setActiveRegistration] = useState(false);

  useEffect(() => {
    token = localStorage.getItem("token");
    if (token != null) {
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
    localStorage.removeItem("token");
    window.location.assign("/");
  };

  const toUser = () => {
    window.location.assign("/user");
  };

  const toBukmeker = () => {
    window.location.assign("/bukmeker");
  };

  return (
    <>
      <Container>
        <>
          {decoded.email != "" ? (
            <ItemContainer>
              {decoded.role == "admin" && <><Item onClick={toAdmin}>Главная</Item></>}
              {decoded.role == "user" && <><Item onClick={toMain}>Главная</Item><Item onClick={toUser}>Личный кабинет</Item>
                <Item>
                  {decoded.money} BYN
                </Item></>}
              {decoded.role == "bukmeker" && <><Item onClick={toBukmeker}>Главная</Item></>}
              <Item onClick={exit}>Выйти</Item>
            </ItemContainer>
          ) : (
            <ItemContainer>
              <Item onClick={() => setActiveLogin(true)}>Войти</Item>
              <Item onClick={() => setActiveRegistration(true)}>
                Зарегестрироваться
              </Item>
            </ItemContainer>
          )}
        </>
      </Container>
      <Modal active={activeLogin} setActive={setActiveLogin}>
        {Login(activeLogin, setActiveLogin)}
      </Modal>
      <Modal active={activeRegistration} setActive={setActiveRegistration}>
        {Registration(activeLogin, setActiveLogin)}
      </Modal>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 50px;
  color: #10a110;

  //background-color: #10a110;
  background-color:blue;
  transition: all 0.5s ease;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

// const Item = styled(Link)`
//   display: flex;
//   padding: 30px;
//   text-decoration: none;
//   color: black;
// `;

const Item = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  padding: 30px;
  text-decoration: none;
  color: white;
`;

const TextHeader = styled(Text)`
  margin-left: 10px;
  font-family: "Inter Medium";
  font-size: 18px;
`;

const Line = styled.hr`
  width: 1px;
  height: 50px;
`;
