import { Col, Container, Row } from "react-bootstrap";
import { useRegionsUpcomingMatches } from "../../hooks/region";


export function RegionsUpcomingMatches() {
    const {regions, error, loading} = useRegionsUpcomingMatches();

  return (
    <Row>
        {regions.map((region)=>(
            <Container key={region.id}>
                <details>
                    <summary>{region.region}</summary>
                    {region.championships.map((ch)=>(
                        <p>{ch.name}</p>
                    ))}
                </details>
            </Container>
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