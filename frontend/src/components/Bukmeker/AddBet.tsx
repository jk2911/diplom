import axios, { AxiosError } from "axios";
import { useState } from "react";

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
        <div>
            название <input value={name} onChange={(e) => setName(e.target.value)} />
            <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
            />
            {/* {errorCreate} */}
            <div>{error}</div>
            <button onClick={FetchAddBet}>{buttonState}</button>
        </div>
    );
}