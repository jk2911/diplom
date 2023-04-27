import { Col, Container, Row } from "react-bootstrap";
import { IRegion } from "../entity/Region";

interface RegionsProps {
  region: IRegion;
}

export function Regions({ region }: RegionsProps) {
  return (
    <Row>
      <Container>{region.name}</Container>
    </Row>
  );
}
