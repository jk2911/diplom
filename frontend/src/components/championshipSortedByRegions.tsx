import { Col, Container, Row, Tab } from "react-bootstrap";
import { IChampioshipSortedByRegion } from "../entity/ChampionshipSortedByRegion";

interface RegionsProps {
  region: IChampioshipSortedByRegion;
}

export function Region({ region }: RegionsProps) {
  return (
    <Row>
      <details>
        <summary>{region.region}</summary>
        {region.championships.map((ch) => (
              <Row>{ch.name}</Row>
          ))} 
      </details>
      {/* <Container>{region.region}</Container>
      {region.championships.map((ch) => (
              <Row>{ch.name}</Row>
          ))} */}
    </Row>
  );
}

<details open>
  <summary>Легенда</summary>
  <p>Раскрывающийся текст</p>
</details>;
