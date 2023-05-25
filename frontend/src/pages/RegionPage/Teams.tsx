import { useRegionalChampionship } from "../../hooks/championship";
import { useRegionalTeams } from "../../hooks/team";
import image from "../../assets/club.png";

interface Props {
  regionId: number;
}

export function RegionalTeams({ regionId }: Props) {
  const { teams, error, loading } = useRegionalTeams(regionId);

  return (
    <>
      {error && <>{error}</>}
      {loading && <>Загрузка</>}
      {teams.map((team) => (
        <div style={{ marginTop: "10px" }}>
          <img
            src={team.image != null ? team.image : image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
          {team.name}
        </div>
      ))}
    </>
  );
}
