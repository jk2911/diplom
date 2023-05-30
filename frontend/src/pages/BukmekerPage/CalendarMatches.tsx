import { useSearchParams } from "react-router-dom";
import { useAllChampionships } from "../../hooks/championship";
import { useCalendarOfChampionshipMatches } from "../../hooks/match";
import { MatchBukmeker } from "../../components/Bukmeker/Match";

interface Props {
    id: number
}

export function BukmekerCalendarMatches({ id }: Props) {

    const { matches, error, loading } = useCalendarOfChampionshipMatches(id);

    return (<div>
        {loading && <>Загрузка</>}
        {matches.map((m) => (
            <MatchBukmeker m={m} key={m.id} />
        ))}

    </div>)
}