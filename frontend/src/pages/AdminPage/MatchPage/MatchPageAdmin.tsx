import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import { useMatch } from "../../../hooks/match";
import styled from "styled-components";
import { BetsValue } from "../../../components/Admin/Match/Bets";
import { Row, Col } from "react-bootstrap";
import "../../../styles/tabs.css";
import { useEffect, useState } from "react";
import { IBet } from "../../../entity/Bet";
import { IBetValue } from "../../../entity/BetValue";
import image from "../../../assets/club.png";

const newBetValue: IBetValue = {
  id: 0,
  name: "",
  value: 1,
  betId: 1,
};

const newBet: IBet = {
  id: 0,
  name: "",
  matchId: 0,
  values: [newBetValue],
};

export function MatchPageAdmin() {
  const [homeGoal, setGoalHome] = useState(0);
  const [awayGoal, setGoalAway] = useState(0);

  const [possession, setPossesion] = useState(50);
  const [shotsHome, setShotsHome] = useState(0);
  const [shotsAway, setShostAway] = useState(0);
  const [shotsInTargetHome, setShotsTarHome] = useState(0);
  const [shotsInTargetAway, setShotsTarAway] = useState(0);
  const [cornerHome, setCornerHome] = useState(0);
  const [cornerAway, setCornerAway] = useState(0);
  const [saveHome, setSaveHome] = useState(0);
  const [saveAway, setSaveAway] = useState(0);
  const [foulsHome, setFoulsHome] = useState(0);
  const [foulsAway, setFoulsAway] = useState(0);
  const [offsideHome, setOffsideHome] = useState(0);
  const [offsideAway, setOffsideAway] = useState(0);
  const [yellowCardHome, setYellowCardHome] = useState(0);
  const [yellowCardAway, setYellowCardAway] = useState(0);
  const [redCardHome, setRedCardHome] = useState(0);
  const [redCardAway, setRedCardAway] = useState(0);
  //const [stage, setStage] = useState("");

  const [params, setParams] = useSearchParams();
  const [matchHook, setMatchHook] = useState();

  const [bets, setBets] = useState<IBet[]>([]);

  const id = params.get("id");

  const { match, error, loading } = useMatch(Number(id));

  function save() {
    console.log(match?.bets);
  }

  // useEffect(() => {
  //   if (!match) return;
  // }, [match?.bets]);

  useEffect(() => {
    if (!match) return;
    if (match.bets) setBets(match.bets);

    setStatistics();
  }, [match?.bets]);

  function AddBet() {
    if (!match) return;
    if (match.bets) {
      match.bets.push(newBet)
      setBets([...match.bets])
    };
  }

  function Save() {
    console.log(match);
  }

  const setStatistics = () => {
    if (match === undefined) return;
    console.log(match);

    setGoalHome(match.homeGoal);
    setGoalAway(match.awayGoal);
    setPossesion(match.possession);
    setShotsHome(match.shotsHome);
    setShostAway(match.shotsAway);
    setShotsTarHome(match.shotsInTargetHome);
    setShotsTarAway(match.shotsInTargetAway);
    setCornerHome(match.cornerHome);
    setCornerAway(match.cornerAway);
    setSaveHome(match.cornerAway);
    setFoulsHome(match.foulsHome);
    setFoulsAway(match.foulsAway);
    setOffsideHome(match.offsideHome);
    setOffsideAway(match.offsideAway);
    setYellowCardHome(match.yellowCardHome);
    setYellowCardAway(match.yellowCardAway);
    setRedCardHome(match.redCardHome);
    setRedCardAway(match.redCardAway);
  };

  return (
    <Container>
      <Content>
        {match && (
          <div>
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
              {match.home.name} {match.away.name}{" "}
              <img
                src={match.away.image != null ? match.away.image : image}
                style={{
                  minHeight: 10,
                  maxHeight: 70,
                  minWidth: 10,
                  maxWidth: 70,
                }}
              />
              <button onClick={save}>Сохранить</button>
            </div>

            <div className="tabs">
              <input
                type="radio"
                name="tab-btn"
                id="tab-btn-1"
                value=""
                checked
              />
              <label htmlFor="tab-btn-1">Статистика</label>
              <input type="radio" name="tab-btn" id="tab-btn-2" value="" />
              <label htmlFor="tab-btn-2">Ставки</label>
              <div id="content-1">
              <div id="content-2">
                <div>
                  <>Голы</>
                  <input
                    type="number"
                    value={homeGoal}
                    onChange={(e) => setGoalHome(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={awayGoal}
                    onChange={(e) => setGoalAway(Number(e.target.value))}
                  />
                </div>
                <div>
                  <>Угловые</>
                  <input
                    type="number"
                    value={cornerHome}
                    onChange={(e) => setCornerHome(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={cornerAway}
                    onChange={(e) => setCornerAway(Number(e.target.value))}
                  />
                </div>
                <div>
                  <>Удары</>
                  <input
                    type="number"
                    value={shotsHome}
                    onChange={(e) => setShotsHome(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={shotsAway}
                    onChange={(e) => setShostAway(Number(e.target.value))}
                  />
                </div>
                <div>
                  <>Удары в створ</>
                  <input
                    type="number"
                    value={shotsInTargetHome}
                    onChange={(e) => setShotsTarHome(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={shotsInTargetAway}
                    onChange={(e) => setShotsTarAway(Number(e.target.value))}
                  />
                </div>
                <div>
                  <>Сэйвы</>
                  <input
                    type="number"
                    value={saveHome}
                    onChange={(e) => setSaveHome(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={saveAway}
                    onChange={(e) => setSaveAway(Number(e.target.value))}
                  />
                </div>
                <div>
                  <>Владение</>
                  <input
                    type="number"
                    value={possession}
                    onChange={(e) => setPossesion(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={possession}
                    onChange={(e) => setPossesion(Number(e.target.value))}
                  />
                </div>
                <div>
                  <>Фолы</>
                  <input
                    type="number"
                    value={foulsHome}
                    onChange={(e) => setFoulsHome(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={foulsAway}
                    onChange={(e) => setFoulsAway(Number(e.target.value))}
                  />
                </div>
                <div>
                  <>Оффсайды</>
                  <input
                    type="number"
                    value={offsideHome}
                    onChange={(e) => setOffsideHome(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={offsideAway}
                    onChange={(e) => setOffsideAway(Number(e.target.value))}
                  />
                </div>
                <div>
                  <>Желтые карточки</>
                  <input
                    type="number"
                    value={yellowCardHome}
                    onChange={(e) => setYellowCardHome(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={yellowCardAway}
                    onChange={(e) => setYellowCardAway(Number(e.target.value))}
                  />
                </div>
                <div>
                  <>Красные карточки</>
                  <input
                    type="number"
                    value={redCardHome}
                    onChange={(e) => setRedCardHome(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={redCardAway}
                    onChange={(e) => setRedCardAway(Number(e.target.value))}
                  />
                </div>
              </div>
                <button onClick={AddBet}>Добавить</button>
                <button onClick={Save}>Сохранить</button>
                <BetsValue bets={bets} setBets={() => setBets} />
              </div>
              
            </div>
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
