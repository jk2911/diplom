import { useRegionalChampionship } from "../../hooks/championship";

interface Props {
  regionId: number;
}

export function RegionalChampionships({ regionId }: Props) {
  const { championships, error, loading } = useRegionalChampionship(regionId);

  return (
    <>
      {error && <>{error}</>}
      {loading && <>Загрузка</>}
      {championships.map((ch) => (
        <div>
          {" "}
          <img
            src={ch.image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
          {ch.name}
        </div>
      ))}
    </>
  );
}
