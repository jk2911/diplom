import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useUserCards } from "../../hooks/card";
import { Modal } from "../../modal/Modal";
import { AddNewCard } from "./AddNewCard";

interface Props {
  id: number;
  setActiveAddCard: (active: boolean) => void;
  amount: number;
  setAmount: (num: number) => void
}

export function AddMoney({ id, setActiveAddCard, amount, setAmount }: Props) {
  const [button, setButton] = useState("Положить");
  const [error, setError] = useState("");
  const [card, setCard] = useState(0);
  const { cards, error: errorCards, loading } = useUserCards(id);

  const Add = async () => {
    if (card == 0) {
      setActiveAddCard(true);
      return;
    }

    setButton("...");

    try {
      const response = await axios.post(
        "https://localhost:7167/api/User/Refill/" + id + "-" + amount
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
    <div style={{fontSize:"18px"}}>
      <div style={{marginBottom:"15px"}}>Пополнение счета</div>
      <select onChange={e => setCard(Number(e.target.value))}>
        <option value={0}>Добавить новую карту</option>
        {loading && <>Загрузка</>}
        {cards.map((c) => (<option value={c.id} key={c.id}>{c.number}</option>))}
      </select>
      <input
      style={{marginLeft:"20px"}}
        type="number"
        value={amount}
        placeholder="E-mail"
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <div style={{ height: 30, width: 120 }}>{error}</div>


      <button style={{borderRadius:"3px"}} onClick={Add}>{button}</button>
    </div>
  );
}
