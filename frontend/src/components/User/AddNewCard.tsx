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
    const [numberValue, setNumberValue] = useState("");


    function setNumberCard(e: any) {
        e.preventDefault();

        const t: string = e.target.value;

        if (t.length == 0) {
            setNumber("");
            return;
        }

        const arr = t.split("");

        for (var i = 0; i < arr.length; i++) {
            const temp = Number(arr[i])
            if (isNaN(temp))
                return;
        }
        setNumber(t);
    }



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
        <div style={{ fontSize: "18px" }}>
            <input
                style={{ marginRight: "20px", marginTop: "20px" }}
                type="text"
                value={number}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                onChange={(e) => setNumberCard(e)}
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

            <div style={{ height: 30, width: 450, marginTop: "10px", marginBottom: "10px  " }}>{error}</div>


            <button style={{ borderRadius: "3px" }} onClick={Add}>{button}</button>
        </div>
    );
}