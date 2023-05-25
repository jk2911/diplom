import { useState } from "react";
import { IUser } from "../../../entity/User";
import axios, { AxiosError } from "axios";
import styled from "styled-components";

interface Props {
  user: IUser;
}

export function ChangeRole({ user }: Props) {
  const [button, setButton] = useState("Изменить");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeButton, setActiveButton] = useState(false);
  const [role, setRole] = useState("admin");

  async function Change() {
    setButton("Изменение...");

    try {
      const response = await axios.put(
        "https://localhost:7167/api/User/ChangeRole/" + user.id + "/" + role
      );
      window.location.assign("/admin/users");
    } catch (e: unknown) {
      const error = e as AxiosError;
      // console.log(error.message);
      // console.log(error.response?.data);
      const message = error.response?.data as String;
      setErrorMessage(message.toString());
      console.log(error);
    }
    setButton("Изменить");
  }

  return (
    <FormContainer>
      <Div>Изменить роль {user.email}</Div>
      <Div>
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Администратор</option>
          <option value="user">Пользователь</option>
          <option value="bukmeker">Букмекер</option>
        </select>
      </Div>
      <Div>
        <StyledButton disabled={activeButton} onClick={Change}>
          {button}
        </StyledButton>
      </Div>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledButton = styled.button`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 56px;
  padding-left: 60px;
  padding-right: 60px;
  font-size: 18px;
  font-family: "Montserrat-Bold";
  text-align: center;
  border: none;
  :hover {
    cursor: pointer;
  }
  transition-duration: 0.4s;
`;

const Div = styled.div`
  margin-bottom: 15px;
`;
