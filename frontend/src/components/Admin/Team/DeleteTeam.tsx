import { useState } from "react";
import { IRegion } from "../../../entity/Region";
import axios, { AxiosError } from "axios";
import { ITeam } from "../../../entity/Team";
import styled from "styled-components";

interface Props {
  team: ITeam;
}

export function DeleteTeam({ team }: Props) {
  const [button, setButton] = useState("Подтвердить");
  const [errorMessage, setErrorMessage] = useState("");

  const Remove = async () => {
    //event.preventDefault();
    setButton("Удаление...");

    try {
      const response = await axios.delete(
        "https://localhost:7167/api/Team/DeleteTeam?id=" + team.id
      );
      const message = response.data as String;
      setErrorMessage(message.toString());
    } catch (e: unknown) {
      const error = e as AxiosError;
      // console.log(error.message);
      // console.log(error.response?.data);
      const message = error.response?.data as String;
      setErrorMessage(message.toString());
    }
    window.location.assign("/admin/teams");
  };

  return (
    <FormContainer>
      <Div>Удалить команду {team.name}</Div>
      <Div>{errorMessage}</Div>
      <Div>
        <StyledButton onClick={Remove}>{button}</StyledButton>
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
