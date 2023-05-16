import { IMatch } from "../../entity/Match";
import { useChampionshipMatchResults } from "../../hooks/match";

interface Props {
  id: number;
}

export function ResultsMatch({ id }: Props) {
  const { matches, error, loading } = useChampionshipMatchResults(id);

  const date = new Date();
  console.log(date);

  return <>{matches.map((m) => Match(m))}</>;
}

function Match(m: IMatch) {
  m.dateTime = new Date(m.dateTime);

  return (
    <>
      {m.dateTime.getDate()}.
      {m.dateTime.getMonth()} ---
      {m.dateTime.getHours()}:
      {m.dateTime.getMinutes()}
      
      <img
        src={m.home.image}
        style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
      />
      {m.home.name}
      {m.homeGoal}-{m.awayGoal}
      {m.away.name}
      <img
        src={m.away.image}
        style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
      />
    </>
  );
}
