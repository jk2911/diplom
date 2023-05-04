import { Col, Container, Row, Tab } from "react-bootstrap";
import { IUpcomingMatches } from "../entity/UpcomingMatches";

interface RegionsProps {
  region: IUpcomingMatches;
}

export function Region({ region }: RegionsProps) {
  return (
    <Row>
      {/* <details>
        <summary>{region.region}</summary>
        {region.championships.map((ch) => (
              <Row>{ch.name}</Row>
          ))} 
      </details> */}

      <>{region.region} </>

      
      {/* <>{regions.map((region) => (
              <Row>{region.region}</Row>
          ))} </> */}
      {/* <Container>{region.region}</Container>
      {region.championships.map((ch) => (
              <Row>{ch.name}</Row>
          ))} */}
    </Row>
  );
}
