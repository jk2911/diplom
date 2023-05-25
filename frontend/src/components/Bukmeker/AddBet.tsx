import axios, { AxiosError } from "axios";
import { useState } from "react";
import styled from "styled-components";

interface Props {
    matchId: number,
    //setCancel: (i: boolean) => void
}

export function BukmekerAddBet({ matchId }: Props) {
    const [name, setName] = useState("");
    const [buttonState, setButton] = useState("Добавить");
    const [count, setCount] = useState(1);
    const [error, setError] = useState("");


    const FetchAddBet = async (event: any) => {
        //event.preventDefault();
        event.stopPropagation();
        setButton("Добавление");

        const form = new FormData();
        form.append("name", name);

        try {
            const response = await axios.post(
                "https://localhost:7167/api/Bet/AddBet/" + matchId + "/" + count,
                form
            );
            const message = response.data as String;
            window.location.assign("/bukmeker/match?id=" + matchId);
        } catch (e: unknown) {
            const error = e as AxiosError;
            const message = error.response?.data as String;
            console.log(message.toString());
            setError(message.toString());
            //setErrorCreate(message.toString());
        }
        setButton("Создать");
    };

    return (
        <FormContainer>
            <Div>Добавление исхода</Div>
            <Div>
            <input value={name} placeholder="Название исхода" onChange={(e) => setName(e.target.value)} />
            </Div>
            <Div>
            <input
                type="number"
                placeholder="Количество исходов"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
            />
            </Div>
            <Div>{error}</Div>
            <StyledButton onClick={FetchAddBet}>{buttonState}</StyledButton>
        </FormContainer>
    );
}

const FormContainer = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 25vw;
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