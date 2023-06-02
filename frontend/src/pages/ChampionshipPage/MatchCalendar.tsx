import { useCalendarOfChampionshipMatches } from "../../hooks/match";
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

