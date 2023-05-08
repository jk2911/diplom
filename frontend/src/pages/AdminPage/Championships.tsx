import { Row } from "react-bootstrap";
import { useAllRegions } from "../../hooks/region";

export function AllChampionships() {
  const { regions, error, loading } = useAllRegions();
  return (
    <>
      {loading && <>Загрузка епта</>}
      {regions.map((region)=>(
        <Row key={region.id}>
            <details>
                <summary>{region.id} {region.name}</summary>
                <></>
            </details>
        </Row>
      ))}
      {/* {regions.map((region) => (
        <Row>
            {region.id} {region.name}
        </Row>
      ))} */}
    </>
  );
}

