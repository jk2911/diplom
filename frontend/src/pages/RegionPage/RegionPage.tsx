import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useRegion } from "../../hooks/region";
import { RegionalChampionships } from "./Championships";
import { RegionalTeams } from "./Teams";

export function RegionPage() {
  const [params, setParams] = useSearchParams();

  const id = params.get("id");

  const { region, loading, error } = useRegion(Number(id));

  return (
    <Container>
      {error && <>{error}</>}
      {loading && <>Загрузка</>}
      {region && (
        <>
          <img
            src={region.image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
          {region.name}
          <RegionalChampionships regionId={region.id} />
          <RegionalTeams regionId={region.id} />
        </>
      )}
    </Container>
  );
}
