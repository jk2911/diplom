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
            setError("Не хватает средств на счету")
            return;
        }

        if (amount < 2) {
            setError("Сумму ставки должна быть от 2 рублей")
            return;
        }

        try {
            console.log(amount)
            const response = await axios.post(
                "https://localhost:7167/api/Bet/DoBet/" + bet.id + "-" + userId + "-" + amount
            );

            const response1 = await axios.post(
                "https://localhost:7167/api/User/GetToken?email=" + email
            );
                //console.log(response1.data);

            localStorage.setItem("token",response1.data)

            window.location.assign("");

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
                    placeholder="Сумма"
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>
            <div>{error}</div>
            <button onClick={DoBet}>{button}</button>
        </div>)
}