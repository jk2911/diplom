import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import { useTeam } from "../../hooks/team";
import styled from "styled-components";
import { NavBar } from "../../components/Bar/NavBar";
import { MatchCalendar } from "./MatchCalendar";
import { ResultsMatch } from "./ResultsMatch";
import { DeleteTeam } from "../../components/Admin/Team/DeleteTeam";
import { Modal } from "../../modal/Modal";
import { useState } from "react";
import { UpdateTeam } from "../../components/Admin/Team/EditTeam";

export function TeamPage() {
  const [params, setParams] = useSearchParams();
  const [ deleteModalTeam, setDeleteModalTeam ] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const id = params.get("id");

  const { team, error, loading } = useTeam(Number(id));

  return (
    <Container>
      <Content>
        {team && (
          <>
            <Modal active={deleteModalTeam} setActive={setDeleteModalTeam}>
              <DeleteTeam team={team} />
            </Modal>
            <Modal active={editModal} setActive={setEditModal}>
              <UpdateTeam team={team}/>
            </Modal>
            {team.name}
            <button style={{borderRadius:"3px", marginLeft:"15px"}} onClick={() => setEditModal(true)}>
              Изменить команду
            </button>
            <button style={{borderRadius:"3px", marginLeft:"15px"}} onClick={() => setDeleteModalTeam(true)}>
              Удалить команду
            </button>
            <NavBar>
              {/* <TabElement>
            <Link to={"teams?id=" + team.id}>Команды</Link>
          </TabElement> */}
              <TabElement>
                <Link to={"calendar?id=" + team.id}>Календарь</Link>
              </TabElement>
              <TabElement>
                <Link to={"results?id=" + team.id}>Результаты</Link>
              </TabElement>
            </NavBar>
            <Routes>
              {/* <Route
            path="/teams"
            element={<ChampionshipTeams championshipId={championship.id} />}
          /> */}

              <Route
                path="/calendar"
                element={<MatchCalendar id={team.id} />}
              />
              <Route path="/results" element={<ResultsMatch id={team.id} />} />
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
  border-radius: 16px;
  width: 80vw;
  /* height: 850px; */
  background-color: whitesmoke;
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
