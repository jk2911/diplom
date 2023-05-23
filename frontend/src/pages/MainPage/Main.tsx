import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RegionsUpcomingMatches } from "../../components/Main/regions upcoming matches";
import { UpcomingMatchesSortedByRegion } from "../../components/Main/upcoming matches sorted by regions";
import styled from "styled-components";
import { Header } from "../../components/Header/Header";

export function MainPage() {
  const [championship, setChampionship] = useState(0);

  return (
    <Container>
      <Content>
        <Row>
          <Col sm={2}>
            <RegionsUpcomingMatches championship={championship} setChampionship={setChampionship} />
          </Col>
          <Col sm={7}>
            <Row>
              <UpcomingMatchesSortedByRegion championship={championship} setChampionship={setChampionship} />
            </Row>
          </Col>
          <Col sm={3}></Col>
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
  //background-image: url("https://s1.1zoom.ru/big3/335/Footbal_Men_Ball_Legs_493200.jpg");
  background-color: #10a110;
`;

const Content = styled.div`
  display: inline-block;
  margin-top: 60px;
  padding: 20px;
  border-radius: 16px;
  width: 85vw;
  /* height: 850px; */
  background-color: whitesmoke;
`;
