import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useChampionship } from "../../hooks/championship";
import { useRegion } from "../../hooks/region";
import { NavBar } from "../../components/Bar/NavBar";
import { RegionalChampionships } from "../RegionPage/Championships";
import { RegionalTeams } from "../RegionPage/Teams";
import { ChampionshipTeams } from "./ChampionshipTeams";
import { MatchCalendar } from "./MatchCalendar";
import { ResultsMatch } from "./ResultsMatch";
import { useState } from "react";
import { Modal } from "../../modal/Modal";
import { DeleteChampionship } from "../../components/Admin/Championship/DeleteChampionship";
import { UpdateChampionhsip } from "../../components/Admin/Championship/EditChampionship";
import image from "../../assets/club.png";

export function ChampionshipPage() {
  const [params, setParams] = useSearchParams();
  const [deleteModalChampionship, setDeleteModalChampionship] = useState(false);
  const [editChampionship, setEditChampionship] = useState(false);

  const id = params.get("id");

  const { championship, error, loading } = useChampionship(Number(id));

  return (
    <Container>
      <Content>
        {loading && <>Загрузка</>}
        {championship && (
          <>
            <Modal
              active={deleteModalChampionship}
              setActive={setDeleteModalChampionship}
            >
              <DeleteChampionship championship={championship} />
            </Modal>
            <Modal active={editChampionship} setActive={setEditChampionship}>
              <UpdateChampionhsip ch={championship} />
            </Modal>
            <img
              src={championship.image != null ?championship.image:image}
              style={{
                minHeight: 10,
                maxHeight: 70,
                minWidth: 10,
                maxWidth: 70,
                marginRight:"15px"
              }}
            />
            {championship.name} {championship.region.name}
            <button style={{ borderRadius: "3px", marginLeft: "15px" }} onClick={() => setEditChampionship(true)}>
              Изменить чемпионат
            </button>
            <button style={{ borderRadius: "3px", marginLeft: "15px" }} onClick={() => setDeleteModalChampionship(true)}>
              Удалить чемпионат
            </button>
            <NavBar>
              <TabElement>
                <Link to={"teams?id=" + championship.id}>Команды</Link>
              </TabElement>
              <TabElement>
                <Link to={"calendar?id=" + championship.id}>Календарь</Link>
              </TabElement>
              <TabElement>
                <Link to={"results?id=" + championship.id}>Результаты</Link>
              </TabElement>
            </NavBar>
            <Routes>
              <Route
                path="/teams"
                element={<ChampionshipTeams championshipId={championship.id} />}
              />

              <Route
                path="/calendar"
                element={<MatchCalendar id={championship.id} />}
              />
              <Route
                path="/results"
                element={<ResultsMatch id={championship.id} />}
              />
            </Routes>
          </>
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
  background-image: url("https://s1.1zoom.ru/big3/335/Footbal_Men_Ball_Legs_493200.jpg");
`;
const Content = styled.div`
  display: inline-block;
  margin-top: 60px;
  padding: 20px;
  background-color: whitesmoke;
  //background-color: ${(props) => props.theme.loginForm};
  border-radius: 16px;
  width: 80vw;
  //height: 850px;
  //box-shadow: 2px 5px 25px -3px ${(props) => props.theme.textShadow};
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
