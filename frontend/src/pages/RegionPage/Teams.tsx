import { useRegionalChampionship } from "../../hooks/championship";
import { useRegionalTeams } from "../../hooks/team";

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
        <div>
          <img
            src={team.image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
          {team.name}
        </div>
      ))}
    </>
  );
}
