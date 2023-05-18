import axios, { AxiosError } from "axios";
import { useState } from "react";

interface Props {
    matchId: number,
    //setCancel: (i: boolean) => void
}

export function AddBet({ matchId }: Props) {
    const [name, setName] = useState("");
    const [buttonState, setButton] = useState("Добавить");
    const [count, setCount] = useState(1);


    const FetchAddBet = async (event: any) => {
        //event.preventDefault();
        event.stopPropagation();
        setButton("Добавление");

        const form = new FormData();
        form.append("name",name);

        try {
            const response = await axios.post(
                "https://localhost:7167/api/Bet/AddBet/" + matchId + "/" + count,
                form
            );
            const message = response.data as String;
            //setErrorCreate(message.toString());
            window.location.assign("/admin/match?id=" + matchId);
        } catch (e: unknown) {
            const error = e as AxiosError;
            const message = error.response?.data as String;
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
            <button onClick={FetchAddBet}>{buttonState}</button>
        </div>
    );
}