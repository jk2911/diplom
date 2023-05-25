import { useNavigate } from "react-router-dom";
import { useCalendarOfChampionshipMatches } from "../../hooks/match";
import { NormalDate } from "../../components/Main/upcoming matches sorted by regions";
import { IMatch } from "../../entity/Match";
import { Match } from "../../components/Admin/Championship/Match";
import { useState } from "react";
import { Modal } from "../../modal/Modal";
import { CreateMatch } from "../../components/Admin/Championship/CreateMatch";

interface Props {
  id: number;
}

export function MatchCalendar({ id }: Props) {
  const [createMatch, setCreateMatch] = useState(false)
  const { matches, error, loading } = useCalendarOfChampionshipMatches(id);

  const navigate = useNavigate();

  const toMatch = (id: number) => {
    navigate("/admin/match?id=" + id);
  };

  return (
    <div>
      <Modal active={createMatch} setActive={setCreateMatch}>
        <CreateMatch id={id} />
      </Modal>
      <div><button style={{borderRadius:"3px"}} onClick={() => setCreateMatch(true)}>Создать матч</button></div>
      <div>
        {matches.map((m) => (
          <Match m={m} key={m.id} />
        ))}
      </div>
    </div>
  );
}

