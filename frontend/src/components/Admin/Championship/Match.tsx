import { useNavigate } from "react-router-dom";
import { IMatch } from "../../../entity/Match";
import { NormalDate } from "../../Main/UpcomingMatchesSorted";
import image from "../../../assets/club.png";

interface MatchProps {
  m: IMatch;
}

export function Match({ m }: MatchProps) {
  const navigate=useNavigate();

  const toMatch = () => {
    navigate("/admin/match?id=" + m.id);
  };

  m.dateTime = new Date(m.dateTime);
  return (
    <div style={{marginTop:"15px"}} onClick={toMatch}>
      <>
        {NormalDate(m.dateTime.getDate())}.{NormalDate(m.dateTime.getMonth())}{" "}
        {NormalDate(m.dateTime.getHours())}:
        {NormalDate(m.dateTime.getMinutes())}
        <img
          src={m.home.image != null ? m.home.image : image}
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
          src={m.away.image != null ? m.away.image : image}
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
