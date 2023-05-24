import { useEffect, useState } from "react";
import { useUserCards } from "../../hooks/card"
import axios, { AxiosError } from "axios";

interface Props {
    id: number
}

export function Withdrawal({ id }: Props) {
    const { cards, error: errorCards, loading } = useUserCards(id)
    const [card, setCard] = useState(0);
    const [error, setError] = useState("");
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if (cards.length > 0) setCard(cards[0].id);
    }, [cards]);

    async function WithdrawalFetch() {
        try {
            const response = await axios.post(
                "https://localhost:7167/api/User/Withdrawal/" + id + "-" + amount
            );
            const user = response.data;
            console.log(user);
            localStorage.setItem("token", user);
            window.location.assign("/user");
        } catch (e: unknown) {
            const error = e as AxiosError;
            const message = error.response?.data as String;
            console.log(message.toString());
            setError(message.toString());
        }
    }

    return (
        <div>
            <select onChange={e => setCard(Number(e.target.value))}>
                {loading && <>Загрузка</>}
                {cards.map((c) => (<option value={c.id} key={c.id}>{c.number}</option>))}
            </select>
            <input
                style={{ marginLeft: "20px" }}
                type="number" value={amount}
                onChange={(e) => setAmount(Number(e.target.value))} />
            <div>{error}</div>
            <div><button onClick={WithdrawalFetch}>Вывести</button></div>
        </div>)
}