import { useCalendarOfTeamMatches } from "../../hooks/match";


interface Props {
  id: number;
}

export function MatchCalendar({ id }: Props) {
  const { matches, error, loading } = useCalendarOfTeamMatches(id);

  return (
    <>
      {matches.map((m) => (
        <>
          {m.dateTime.getDate}
          {m.dateTime.getMonth}
          <img
            src={m.home.image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
          {m.home.name}
          {/* {m.homeGoal}-{m.awayGoal} */}
          {m.away.name}
          <img
            src={m.away.image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
        </>
      ))}
    </>
  );
}