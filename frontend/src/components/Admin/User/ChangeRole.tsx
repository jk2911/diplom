import { useState } from "react";
import { IUser } from "../../../entity/User";
import axios, { AxiosError } from "axios";

interface Props {
    user: IUser;
}

export function ChangeRole({ user }: Props) {
    const [button, setButton] = useState("Изменить");
    const [errorMessage, setErrorMessage] = useState("");
    const [activeButton, setActiveButton] = useState(false);
    const [role, setRole] = useState("admin")

    async function Change() {
        setButton("Изменение...");

        try {
            const response = await axios.put(
                "https://localhost:7167/api/User/ChangeRole/" + user.id + "/" + role
            )
            window.location.assign("/admin/users")
        } catch (e: unknown) {
            const error = e as AxiosError;
            // console.log(error.message);
            // console.log(error.response?.data);
            const message = error.response?.data as String;
            setErrorMessage(message.toString());
            console.log(error)
        }
        setButton("Изменить")
    }

    return (<div>
        <div>Изменить роль {user.email}</div>
        <div>
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Администратор</option>
                <option value="user">Пользователь</option>
                <option value="bukmeker">Букмекер</option>
            </select>
        </div>
        <div>
            <button disabled={activeButton} onClick={Change}>{button}</button>
        </div>
    </div>)
}