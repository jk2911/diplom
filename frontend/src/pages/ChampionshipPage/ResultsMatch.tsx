import { NormalDate } from "../../components/Main/UpcomingMatchesSorted";
import { IMatch } from "../../entity/Match";
import { useChampionshipMatchResults } from "../../hooks/match";
import image from "../../assets/club.png";

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
    <div style={{ marginTop: "15px", display:"flex", flexDirection:"row" }}>
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
        <div style={{ width: "12%" }}>
        {m.home.name}</div>

        <div style={{ width: "3%" }}>
        {m.homeGoal}</div>

        <div style={{ width: "3%" }}>
        {m.awayGoal}</div>
        <div style={{ width: "12%" }}>
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
  );
}
