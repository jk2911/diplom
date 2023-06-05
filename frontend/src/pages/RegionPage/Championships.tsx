import { useRegionalChampionship } from "../../hooks/championship";
import image from "../../assets/club.png";

interface Props {
  regionId: number;
}

export function RegionalChampionships({ regionId }: Props) {
  const { championships, error, loading } = useRegionalChampionship(regionId);

  function ToChampionship(id: number) {
    window.location.assign("/admin/championship/teams?id=" + id);
  }

  return (
    <>
      {error && <>{error}</>}
      {loading && <>Загрузка</>}
      {championships.map((ch) => (
        <div onClick={() => ToChampionship(ch.id)} style={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "15%" }}>
            <img
              src={ch.image != null ? ch.image : image}
              style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div>{ch.name}</div>
          </div>
        </div>
      ))}
    </>
  );
}
