import { useState } from "react";
import { IRegion } from "../../../entity/Region";
import axios, { AxiosError } from "axios";
import { IChampionship } from "../../../entity/Championship";
import styled from "styled-components";

interface Props {
  championship: IChampionship;
}

export function DeleteChampionship({ championship }: Props) {
  const [button, setButton] = useState("Подтвердить");
  const [errorMessage, setErrorMessage] = useState("");

  const Remove = async () => {
    //event.preventDefault();
    setButton("Удаление...");

    try {
      const response = await axios.delete(
        "https://localhost:7167/api/Championship/DeleteChampionship?id=" +
          championship.id
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
    window.location.assign("/admin/championships");
  };

  return (
    <FormContainer>
      <Div>Удалить чемпионат {championship.name}</Div>
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
