import { useNavigate } from "react-router-dom";
import { useCalendarOfChampionshipMatches } from "../../hooks/match";
import { NormalDate } from "../../components/Main/upcoming matches sorted by regions";
import { IMatch } from "../../entity/Match";
import { Match } from "../../components/Admin/Championship/Match";

interface Props {
  id: number;
}

export function MatchCalendar({ id }: Props) {
  const { matches, error, loading } = useCalendarOfChampionshipMatches(id);

  const navigate = useNavigate();

  const toMatch = (id: number) => {
    navigate("/admin/match?id=" + id);
  };

  return (
    <>
      {matches.map((m) => (
        <Match m={m} key={m.id}/>
      ))}
    </>
  );
}

