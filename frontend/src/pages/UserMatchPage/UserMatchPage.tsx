
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import image from "../../assets/club.png"
import { BetsValue } from "../../components/Admin/Match/Bets";
import { IBet } from "../../entity/Bet";
import { IBetValue } from "../../entity/BetValue";
import { useMatch } from "../../hooks/match";
import { MatchBets } from "../../components/User/MatchBets";
import { Modal } from "../../modal/Modal";
import { DoBet } from "../../components/User/DoBet";

const newBetValue: IBetValue = {
  id: 0,
  name: "",
  value: 1,
  betId: 1,
  isConfirm: undefined
};

export function UserMatchPage() {
  //const [stage, setStage] = useState("");
  const [bet, setBet] = useState(newBetValue);
  const [activeBet, setActiveBet] = useState(false);

  const [params, setParams] = useSearchParams();

  const id = Number(params.get("id"));

  const { match, error, loading } = useMatch(id);

  function modalBet(newBet: IBetValue) {
    setBet(newBet);
    setActiveBet(true);
  }

  return (
    <Container>
      <Content>
        {match && (
          <div>
            <div style={{ display: "flex", justifyContent: "center", height: "60px" }}>
              <div>
                <img
                  src={match.home.image != null ? match.home.image : image}
                  style={{
                    minHeight: 10,
                    maxHeight: 70,
                    minWidth: 10,
                    maxWidth: 70,
                  }}
                />{" "}
                {match.home.name}{"   "} {match.away.name}{" "}
                <img
                  src={match.away.image != null ? match.away.image : image}
                  style={{
                    minHeight: 10,
                    maxHeight: 70,
                    minWidth: 10,
                    maxWidth: 70,
                  }}
                />
              </div>
            </div>
            <MatchBets bets={match.bets} setBet={modalBet} />
            <Modal active={activeBet} setActive={setActiveBet}>
              <DoBet bet={bet} />
            </Modal>
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

const TabsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 15px;
`;
const TabElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  padding: 9px 20px;
  font-size: 18px;
  /* box-shadow: 2px 5px 25px -3px ${(props) => props.theme.textShadow}; */
  border-radius: 10px;
  /* background-color: ${(props) => props.theme.tabsBackColor};
  color: ${(props) => props.theme.paginationButtonColor}; */
  cursor: pointer;
`;
