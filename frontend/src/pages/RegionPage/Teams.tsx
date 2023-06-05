import { useRegionalChampionship } from "../../hooks/championship";
import { useRegionalTeams } from "../../hooks/team";
import image from "../../assets/club.png";

interface Props {
  regionId: number;
}

export function RegionalTeams({ regionId }: Props) {
  const { teams, error, loading } = useRegionalTeams(regionId);

  function ToTeam(id: number) {
    window.location.assign("/admin/team/calendar?id=" + id);
  }

  return (
    <>
      {error && <>{error}</>}
      {loading && <>Загрузка</>}
      {teams.map((team) => (
        <div onClick={() => ToTeam(team.id)} style={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "15%" }}>
          <img
            src={team.image != null ? team.image : image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <div>{team.name}</div>
        </div>
      </div>
      ))}
    </>
  );
}
