import { useSearchParams } from "react-router-dom";
import { useMatch } from "../../../hooks/match";
import styled from "styled-components";
import { BetsValue } from "../../../components/Admin/Match/Bets";
import { Row, Col } from "react-bootstrap";
import "../../../styles/tabs.css";
import { useEffect, useState } from "react";
import { IBet } from "../../../entity/Bet";

export function MatchPageAdmin() {
  const [params, setParams] = useSearchParams();

  const [bets, setBets] = useState<IBet[]>([]);

  const id = params.get("id");

  const { match, error, loading } = useMatch(Number(id));

  function save() {
    console.log(match?.bets);
  }

  useEffect(() => {
    setValues();
  }, [match]);

  function setValues() {
    if (!match) return;
    if (match.bets) setBets(match.bets);
  }

  return (
    <Container>
      <Content>
        {match && (
          <div>
            <div>
              {match.home.name} {match.away.name}{" "}
              <button onClick={save}>Сохранить</button>
            </div>

            <Row>
              <Col sm={9}>
                <BetsValue bets={bets} setBets={() => setBets} />
              </Col>
              <Col>
                <div>
                  {match.cornerHome} - {match.cornerAway}
                </div>
                <div>
                  {match.shotsHome} - {match.shotsAway}
                </div>
                <div>
                  {match.shotsInTargetHome} - {match.shotsInTargetAway}
                </div>
                <div>
                  {match.saveHome} - {match.saveAway}
                </div>
                <div>
                  {match.possession}% - {100 - match.possession}%
                </div>
              </Col>
            </Row>
          </div>
        )}
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
  /* background-color: rgba(127, 255, 0, 0.9); */
  background-image: url("https://s1.1zoom.ru/big3/335/Footbal_Men_Ball_Legs_493200.jpg");
`;

const Content = styled.div`
  display: inline-block;
  margin-top: 60px;
  padding: 20px;
  border-radius: 16px;
  width: 1000px;
  /* height: 850px; */
  background-color: whitesmoke;
`;
