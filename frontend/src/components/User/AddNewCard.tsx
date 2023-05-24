import axios, { AxiosError } from "axios";
import { useState } from "react";

interface Props {
    id: number;
    amount: number
}

export function AddNewCard({ id, amount }: Props) {
    const [button, setButton] = useState("Положить");
    const [error, setError] = useState("");
    const [number, setNumber] = useState("");

    const Add = async () => {
        if (number.length != 16) {
            setError("Должно быть 16 цифр а не " + number.length);
            return;
        }
        setButton("...");

        try {
            const response = await axios.post(
                "https://localhost:7167/api/Card/AddCard",
                { number: number, amount: amount, userId: id }
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
    };

    return (
        <div>
            <input
                style={{ marginRight: "20px", marginTop: "20px" }}
                type="text"
                value={number}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                onChange={(e) => setNumber(e.target.value)}
            />

            <input
                type="password"
                placeholder="CVC"
            />

            <div>
                <input
                    style={{ marginRight: "20px", marginTop: "20px" }}
                    type="number"
                    placeholder="MM"
                />
                <input
                    type="number"
                    placeholder="YY"
                />
            </div>

            <div style={{ height: 30, width: 120 }}>{error}</div>


            <button onClick={Add}>{button}</button>
        </div>
    );
}