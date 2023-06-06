import { useNavigate } from "react-router-dom";
import { IMatch } from "../../entity/Match";
import { NormalDate } from "../Main/UpcomingMatchesSorted";
import image from "../../assets/club.png";

interface MatchProps {
    m: IMatch;
}

export function MatchBukmeker({ m }: MatchProps) {
    const navigate = useNavigate();

    const toMatch = () => {
        navigate("/bukmeker/match?id=" + m.id);
    };

    m.dateTime = new Date(m.dateTime);
    return (
        <div onClick={toMatch}>
            <div style={{ marginTop: "15px", display: "flex", flexDirection: "row" }} onClick={toMatch}>
                <div style={{ width: "9%" }}>
                    {NormalDate(m.dateTime.getDate())}.{NormalDate(m.dateTime.getMonth())}{" "}
                    {NormalDate(m.dateTime.getHours())}:
                    {NormalDate(m.dateTime.getMinutes())}
                </div>
                <div style={{ width: "6%" }}>
                    <img
                        src={m.home.image != null ? m.home.image : image}
                        style={{
                            minHeight: 10,
                            maxHeight: 50,
                            minWidth: 10,
                            maxWidth: 50,
                        }}
                    /></div>
                <div style={{ width: "15%" }}>
                    {m.home.name}</div>
                <div style={{ width: "15%" }}>
                    {m.away.name}{" "}</div>
                <div style={{ width: "6%" }}>
                    <img
                        src={m.away.image != null ? m.away.image : image}
                        style={{
                            minHeight: 10,
                            maxHeight: 50,
                            minWidth: 10,
                            maxWidth: 50,
                        }}
                    /></div>
            </div>
        </div>
    );
}