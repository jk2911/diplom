import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { redirect } from "react-router-dom";
import { useRegion } from "../hooks/region";
import { Regions } from "../components/regions";

export function MainPage() {
  const { region, error, loading } = useRegion();

  return (
    <Container>
      <Row>
        <Col sm={3}>
          {region.map((reg) => (
              <Regions region={reg} key={reg.id}/>
          ))}
        </Col>
        <Col>
          <Row>матч</Row>
          <Row>матч</Row>
          <Row>
            матч вавы
            ыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыаыа
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
