import { useState } from "react";
import { useChampionshipTeams } from "../../hooks/championship";
import { AddTeamInChampionship } from "../../components/Admin/Championship/AddTeam";
import { Modal } from "../../modal/Modal";
import image from "../../assets/club.png";
import axios, { AxiosError } from "axios";

interface Props {
  championshipId: number;
}

export function ChampionshipTeams({ championshipId }: Props) {
  const { teams, error, loading, fetchChampionship } =
    useChampionshipTeams(championshipId);
  const [activeAddTeam, setActiveAddTeam] = useState(false);

  const DeleteTeam = async (teamId: number) => {
    try {
      const response = await axios.delete(
        "https://localhost:7167/api/Championship/DeleteTeam/" +
        championshipId +
        "-" +
        teamId
      );
      const message = response.data as String;
    } catch (e: unknown) {
      const error = e as AxiosError;
      // console.log(error.message);
      // console.log(error.response?.data);
      const message = error.response?.data as String;
    }
    fetchChampionship();
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <button style={{ borderRadius: "3px" }} onClick={() => setActiveAddTeam(true)}>
        Добавить команду в чемпионат
      </button>
      {error && <>{error}</>}
      {loading && <>Загрузка</>}
      {teams.map((team) => (
        <div style={{ marginTop: "15px", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "40%", display:"flex", flexDirection:"row" }}>
            <div style={{width:"20%"}}>
              <img
                src={team.image != null ? team.image : image}
                style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
              />
            </div>
            <div>
              {team.name}
            </div>
          </div>
          <button style={{ borderRadius: "3px", marginLeft: "5px", height: "50px" }} onClick={() => DeleteTeam(team.id)}>Удалить команду</button>
        </div>
      ))}
      <Modal active={activeAddTeam} setActive={setActiveAddTeam}>
        <AddTeamInChampionship
          setClose={setActiveAddTeam}
          id={championshipId}
        />
      </Modal>
    </div>
  );
}
