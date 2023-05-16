import { Col, Container, Row } from "react-bootstrap";
import { useRegionsUpcomingMatches } from "../../hooks/region";
import { useEffect } from "react";

interface Props {
  championship: number;
  setChampionship: (id: number) => void;
}

export function RegionsUpcomingMatches({
  championship,
  setChampionship,
}: Props) {
  const { regions, error, loading } = useRegionsUpcomingMatches();

  return (
    <Row>
      {regions.map((region) => (
        <Container key={region.id}>
          <details>
            <summary>{region.region}</summary>
            {region.championships.map((ch) => (
              <div onClick={() => setChampionship(ch.id)}>{ch.name}</div>
            ))}
          </details>
        </Container>
      ))}
    </Row>
  );
}

/* <Row>
            <details open>
              <summary>Легенда</summary>
              <p>Раскрывающийся текст</p>
            </details>
          </Row> */
