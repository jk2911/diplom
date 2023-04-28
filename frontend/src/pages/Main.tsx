import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { redirect } from "react-router-dom";
import { useRegion } from "../hooks/region";
import { Regions } from "../components/regions";
import { useChampionshipSortedByRegionsTodays } from "../hooks/championship";
import { Region } from "../components/championshipSortedByRegions";

export function MainPage() {
  const { championships, error, loading } = useChampionshipSortedByRegionsTodays();

  return (
    <Container>
      <Row>
        <Col sm={3}>
          {championships.map((ch) => (
            <Region region={ch} key={ch.id} />
          ))}
        </Col>
        <Col>
          <Row>
            <details open>
              <summary>Легенда</summary>
              <p>Раскрывающийся текст</p>
            </details>
          </Row>
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
