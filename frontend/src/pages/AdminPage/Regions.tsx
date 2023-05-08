import { Row } from "react-bootstrap";
import { useAllRegions } from "../../hooks/region";

export function AllRegions() {
  const { regions, error, loading } = useAllRegions();
  return (
    <>
      {loading && <>Загрузка епта</>}
      {regions.map((region) => (
        <Row key={region.id}>
        <details>
            <summary>{region.id} {region.name}</summary>
            <>
                {region.championships.map((ch)=>(
                    <Row>
                        {ch.id} {ch.name}
                    </Row>
                ))}
            </>
        </details>
    </Row>
      ))}
    </>
  );
}
