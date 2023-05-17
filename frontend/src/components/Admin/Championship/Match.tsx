import { IMatch } from "../../../entity/Match";
import { NormalDate } from "../../Main/upcoming matches sorted by regions";

interface MatchProps {
  m: IMatch;
}

export function Match({ m }: MatchProps) {
  m.dateTime = new Date(m.dateTime);
  return (
    <div>
      <>
        {NormalDate(m.dateTime.getDate())}.{NormalDate(m.dateTime.getMonth())}{" "}
        {NormalDate(m.dateTime.getHours())}:
        {NormalDate(m.dateTime.getMinutes())}
        <img
          src={m.home.image}
          style={{
            minHeight: 10,
            maxHeight: 70,
            minWidth: 10,
            maxWidth: 70,
          }}
        />{" "}
        {m.home.name}{" "}
        {/* {m.homeGoal}-{m.awayGoal} */}
        {m.away.name}{" "}
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
  );
}
