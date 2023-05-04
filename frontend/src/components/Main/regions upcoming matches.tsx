import { Col, Container, Row } from "react-bootstrap";
import { useRegionsUpcomingMatches } from "../../hooks/region";


export function RegionsUpcomingMatches() {
    const {regions, error, loading} = useRegionsUpcomingMatches();

  return (
    <Row>
        {regions.map((region)=>(
            <>
                <details>
                    <summary>{region.region}</summary>
                    {region.championships.map((ch)=>(
                        <p>{ch.name}</p>
                    ))}
                </details>
            </>
            )) }
    </Row>
  );
}

/* <Row>
            <details open>
              <summary>Легенда</summary>
              <p>Раскрывающийся текст</p>
            </details>
          </Row> */