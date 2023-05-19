import { useState } from "react";
import { IBetValue } from "../../entity/BetValue";
import jwtDecode from "jwt-decode";
import axios, { AxiosError } from "axios";

interface Props {
    bet: IBetValue;
}

export function DoBet({ bet }: Props) {
    const [amount, setAmount] = useState(0);
    const [button, setButton] = useState("Сделать ставку");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");
    var money = 0;

    if (token != null) {
        const user: any = jwtDecode(token);
        money = user.money;
    }

    async function DoBet() {
        if (amount > money) {
            setError("Не хватает средств на счету")
            return;
        }

        if (amount < 2) {
            setError("Сумму ставки должна быть от 2 рублей")
            return;
        }

        try {
            const response = await axios.post(
                "https://localhost:7167/api/Account/Login"
            );
            localStorage.setItem("token", response.data.token);

        } catch (e: unknown) {
            const error = e as AxiosError;
            const message = error.response?.data as String;
            setError(message.toString());
            console.log(message)
        }
    }

    return (
        <div>
            <div>
                {bet.name} {bet.value} {" "}
                <input
                    type="number"
                    value={amount}
                    placeholder="E-mail"
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>
            <div>{error}</div>
            <button onClick={DoBet}>{button}</button>
        </div>)
}