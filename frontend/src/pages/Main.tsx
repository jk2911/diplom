import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RegionsUpcomingMatches } from "../components/Main/regions upcoming matches";
import { UpcomingMatchesSortedByRegion } from "../components/Main/upcoming matches sorted by regions";

export function MainPage() {

  return (
    <Container>
      <Row>
        <Col sm={3}>
          <RegionsUpcomingMatches/>
        </Col>
        <Col>

          <Row>
            <UpcomingMatchesSortedByRegion/>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

/* <Row>
            <details open>
              <summary>Легенда</summary>
              <p>Раскрывающийся текст</p>
            </details>
          </Row> */
