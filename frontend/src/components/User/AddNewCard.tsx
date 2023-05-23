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
                type="text"
                value={number}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                onChange={(e) => setNumber(e.target.value)}
            />

            <div style={{ height: 30, width: 120 }}>{error}</div>


            <button onClick={Add}>{button}</button>
        </div>
    );
}