import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { redirect } from "react-router-dom";
import { useRegion } from "../hooks/region";
import { Regions } from "../components/regions";
import { useChampionshipSortedByRegionsTodays } from "../hooks/championship";
import { Region } from "../components/championshipSortedByRegions";
import { RegionMatches } from "../components/RegionMatches";

export function MainPage() {
  const { championships, error, loading } =
    useChampionshipSortedByRegionsTodays();

    useEffect(()=>{
      console.log(championships)
    }, [championships])

  return (
    <Container>
      <Row>
        <Col sm={3}>
          {championships.map((ch) => (
            <Region region={ch} key={ch.id} />
          ))}
        </Col>
        <Col>
          {/* <Row>
            <details open>
              <summary>Легенда</summary>
              <p>Раскрывающийся текст</p>
            </details>
          </Row> */}

          <Row>

            {championships[0] && <RegionMatches region={championships[0]} />}
            
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
