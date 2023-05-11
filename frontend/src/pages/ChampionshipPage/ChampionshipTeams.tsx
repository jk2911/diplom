import { useChampionshipTeams } from "../../hooks/championship";

interface Props {
    championshipId: number;
  }
  
  export function ChampionshipTeams({ championshipId }: Props) {
    const { teams, error, loading } = useChampionshipTeams(championshipId);
  
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