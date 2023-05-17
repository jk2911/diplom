import { useState } from "react";
import { useChampionshipTeams } from "../../hooks/championship";
import { AddTeamInChampionship } from "../../components/Admin/Championship/AddTeam";
import { Modal } from "../../modal/Modal";
import image from "../../assets/club.png";

interface Props {
  championshipId: number;
}

export function ChampionshipTeams({ championshipId }: Props) {
  const { teams, error, loading } = useChampionshipTeams(championshipId);
  const [activeAddTeam, setActiveAddTeam]=useState(false);

  const DeleteTeam=()=>{

  }

  return (
    <>
      <button onClick={()=>setActiveAddTeam(true)}>Добавить команду в чемпионат</button>
      {error && <>{error}</>}
      {loading && <>Загрузка</>}
      {teams.map((team) => (
        <div>
          <img
            src={team.image!=null?team.image:image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
          {team.name}
          <button>Удалить команду</button>
        </div>
      ))}
      <Modal active={activeAddTeam} setActive={setActiveAddTeam}>
        <AddTeamInChampionship setClose={setActiveAddTeam} id={championshipId}/>
      </Modal>
    </>
  );
}
