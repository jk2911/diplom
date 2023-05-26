import { useEffect, useState } from "react";
import { IBetValue } from "../../entity/BetValue";
import jwtDecode from "jwt-decode";
import axios, { AxiosError } from "axios";
import styled from "styled-components";

interface Props {
  bet: IBetValue;
  activeModal:boolean
}

export function DoBet({ bet, activeModal }: Props) {
  const [amount, setAmount] = useState(2);
  const [button, setButton] = useState("Сделать ставку");
  const [error, setError] = useState("");

  useEffect(() => {
    if(activeModal==false){
      setAmount(2);
      setError("");
    }
  }, [activeModal]);

  const token = localStorage.getItem("token");
  var money = 0;
  var userId = 0;
  var email = "";
  var password = "";

  if (token != null) {
    const user: any = jwtDecode(token);
    money = user.money;
    userId = user.id;
    email = user.email;
    password = user.password;
  }

  async function DoBet() {
    if (amount > money) {
      setError("Не хватает средств на счету");
      return;
    }

    if (amount < 2) {
      setError("Сумму ставки должна быть от 2 рублей");
      return;
    }

    try {
      console.log(amount);
      const response = await axios.post(
        "https://localhost:7167/api/Bet/DoBet/" +
          bet.id +
          "-" +
          userId +
          "-" +
          amount
      );

      localStorage.setItem("token", response.data);

      window.location.assign("");
    } catch (e: unknown) {
      const error = e as AxiosError;
      const message = error.response?.data as String;
      setError(message.toString());
      console.log(message);
    }
  }

  return (
    <FormContainer>
        <Div>Подтверждение ставки</Div>
      <Div>
        {bet.name} {bet.value}{" "}
      </Div>
      <Div>
        <input
          type="number"
          value={amount}
          placeholder="Сумма"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Div>
      <Div>{error}</Div>
      <StyledButton onClick={DoBet}>{button}</StyledButton>
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
