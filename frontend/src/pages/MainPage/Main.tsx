import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { RegionsUpcomingMatches } from "../../components/Main/regions upcoming matches";
import { UpcomingMatchesSortedByRegion } from "../../components/Main/upcoming matches sorted by regions";
import styled from "styled-components";

export function MainPage() {
  return (
    <Container>
      <Content>
        <Row>
          <Col sm={3}>
            <RegionsUpcomingMatches />
          </Col>
          <Col>
            <Row>
              <UpcomingMatchesSortedByRegion />
            </Row>
          </Col>
        </Row>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: start;
  overflow: scroll;
  overflow-x: hidden;
  width: 100vw;
  height: 100%;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  background-image: url("https://s1.1zoom.ru/big3/335/Footbal_Men_Ball_Legs_493200.jpg");
`;

const Content = styled.div`
  display: inline-block;
  margin-top: 60px;
  padding: 20px;
  border-radius: 16px;
  width: 1600px;
  /* height: 850px; */
  background-color: whitesmoke;
`;
