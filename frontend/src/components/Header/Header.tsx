import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTypesSelector } from "../../hooks/useTypedSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/action-creators/user";
import type {} from "redux-thunk/extend-redux";
import { useNavigate } from "react-router-dom";

export function Header() {
  //const {user, error, loading} = useTypesSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // useEffect(()=>{
  //   dispatch(fetchUsers("333", "333"))
  // },[])

  const toAdmin = async () => {
    await navigate("/admin/regions");
  };

  return (
    <HeaderContainer>
      <button>Матчи</button>
      <button>Чемпионаты</button>
      <button>Войти</button>
      <button>Зарегестрироватсья</button>
      <button onClick={toAdmin}>Панель Администрирования</button>
    </HeaderContainer>
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
