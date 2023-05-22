import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Form } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
import { Card } from "react-bootstrap";

interface Props {
  id: number;
}

export function AddMoney({ id }: Props) {
  const [button, setButton] = useState("Положить");
  const [amount, setAmount] = useState(2);
  const [error, setError] = useState("");

  const Add = async () => {
    setButton("...");

    try {
      const response = await axios.post(
        //"https://localhost:7167/api/User/Refill/" + id + "-" + amount
        "https://localhost:7167/api/User/exa"
      );
      const user = response.data;
      console.log(user);
      localStorage.setItem("token", user);
      window.location.assign("/user/bets");
    } catch (e: unknown) {
      const error = e as AxiosError;
      const message = error.response?.data as String;
      console.log(message.toString());
      setError(message.toString());
    }
  };

  return (
    <div>
      <input
                type="number"
                value={amount}
                placeholder="E-mail"
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <div style={{ height: 30, width: 120 }}>{error}</div>
    
    
      <button onClick={Add}>{button}</button>
    </div>
  );
}
