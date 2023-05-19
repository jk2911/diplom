import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useChampionshipTeams } from "../../../hooks/championship";
import { Form } from "react-bootstrap";

interface Props {
    id: number;
}

export function CreateMatch({ id }: Props) {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [buttonState, setButton] = useState("Создать");
    const [error, setError] = useState("");
    const [homeId, setHomeId] = useState(0);
    const [awayId, setAwayId] = useState(0);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const { teams: home, error: e, loading: l } = useChampionshipTeams(id);
    const { teams: away, error: e1, loading: l1 } = useChampionshipTeams(id);

    const FetchCreateMatch = async (event: any) => {
        //event.preventDefault();
        event.stopPropagation();
        setButton("Создание...");

        if (homeId == awayId) {
            setError("Одинаковые команды");
            setButton("Создать");
            return;
        }
        const formData = new FormData();

        formData.append("homeid", homeId.toString());
        formData.append("awayid", awayId.toString());
        formData.append("championshipid", id.toString());
        formData.append("date", date.toString());
        formData.append("time", time.toString());

        try {
            const response = await axios.post(
                "https://localhost:7167/api/Match/CreateMatch",
                formData
            );
            const message = response.data as String;
            setError(message.toString());
            window.location.assign("/admin/championship/calendar?id=" + id)
        } catch (e: unknown) {
            const error = e as AxiosError;
            // console.log(error.message);
            // console.log(error.response?.data);
            const message = error.response?.data as String;
            setError(message.toString());
        }

    };

    useEffect(() => {
        setHomeId(home == null || home.length < 1 ? 0 : home[0].id);
    }, [home]);

    useEffect(() => {
        setAwayId(away == null || away.length < 1 ? 0 : away[0].id);
    }, [away]);

    const setSelectedHome = (str: string) => {
        setHomeId(Number(str));
    };
    const setSelectedAway = (str: string) => {
        setAwayId(Number(str));
    };

    return (
        <div>

            <div><Form.Control
                className="mt-2"
                type="date"
                onChange={(e: any) => setDate(e.target.value)}
            />
                <Form.Control
                    className="mt-2"
                    type="time"
                    onChange={(e: any) => setTime(e.target.value)}
                /></div>
            <select onChange={(e) => setSelectedHome(e.target.value)}>
                {l1 && <>Загрузка</>}
                {home.map((t) => (
                    <option value={t.id}>
                        {t.name}({t.region.name})
                    </option>
                ))}
            </select>
            <select onChange={(e) => setSelectedAway(e.target.value)}>
                {l1 && <>Загрузка</>}
                {away.map((t) => (
                    <option value={t.id}>
                        {t.name}({t.region.name})
                    </option>
                ))}
            </select>
            <div>{error}</div>
            <button onClick={FetchCreateMatch}>{buttonState}</button>
        </div>
    );
}