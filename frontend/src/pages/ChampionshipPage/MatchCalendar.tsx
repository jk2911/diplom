import { useNavigate } from "react-router-dom";
import { useCalendarOfChampionshipMatches } from "../../hooks/match";

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
        <div key={m.id} onClick={() => toMatch(m.id)}>
          <>
            {m.dateTime.getDate}
            {m.dateTime.getMonth}
            <img
              src={m.home.image}
              style={{
                minHeight: 10,
                maxHeight: 70,
                minWidth: 10,
                maxWidth: 70,
              }}
            />
            {m.home.name}
            {/* {m.homeGoal}-{m.awayGoal} */}
            {m.away.name}
            <img
              src={m.away.image}
              style={{
                minHeight: 10,
                maxHeight: 70,
                minWidth: 10,
                maxWidth: 70,
              }}
            />
          </>
        </div>
      ))}
    </>
  );
}
