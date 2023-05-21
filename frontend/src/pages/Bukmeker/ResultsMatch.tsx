import { NormalDate } from "../../components/Main/upcoming matches sorted by regions";
import { IMatch } from "../../entity/Match";
import { useChampionshipMatchResults } from "../../hooks/match";
import image from "../../assets/club.png";
import { useNavigate } from "react-router-dom";

interface Props {
    id: number;
}

export function BukmekerResultsMatch({ id }: Props) {
    const { matches, error, loading } = useChampionshipMatchResults(id);

    const date = new Date();
    console.log(date);

    return <>{matches.map((m) => Match(m))}</>;
}

function Match(m: IMatch) {
    m.dateTime = new Date(m.dateTime);
    //const navigate = useNavigate();

    function toMatch() {
        window.location.assign("/bukmeker/resultsMatch?id=" + m.id);
    }

    return (
        <div onClick={toMatch}>
            {NormalDate(m.dateTime.getDate())}.{NormalDate(m.dateTime.getMonth())}{" "}
            {NormalDate(m.dateTime.getHours())}:{NormalDate(m.dateTime.getMinutes())}
            <img
                src={m.home.image != null ? m.home.image : image}
                style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
            />{" "}
            {m.home.name}{" "}
            {m.homeGoal}{" "}-{" "}{m.awayGoal}{" "}
            {m.away.name}{" "}
            <img
                src={m.away.image != null ? m.away.image : image}
                style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
            />
        </div>
    );
}