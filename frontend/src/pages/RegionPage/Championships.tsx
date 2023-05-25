import { useRegionalChampionship } from "../../hooks/championship";
import image from "../../assets/club.png";

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
        <div style={{marginTop:"10px"}}>
          {" "}
          <img
            src={ch.image != null ? ch.image : image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
          {ch.name}
        </div>
      ))}
    </>
  );
}
