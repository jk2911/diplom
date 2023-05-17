import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import { useRegion } from "../../hooks/region";
import { RegionalChampionships } from "./Championships";
import { RegionalTeams } from "./Teams";
import styled from "styled-components";
import { NavBar } from "../../components/Bar/NavBar";
import { useState } from "react";
import { Modal } from "../../modal/Modal";
import { DeleteRegion } from "../../components/Admin/Region/DeleteRegion";
import { UpdateRegion } from "../../components/Admin/Region/UpdateRegion";

export function RegionPage() {
  const [params, setParams] = useSearchParams();
  const [deleteModalRegion, setDeleteModalRegion] = useState(false);
  const [updateModalRegion, setUpdateModalRegion] = useState(false);

  const id = params.get("id");

  const { region, loading, error } = useRegion(Number(id));

  return (
    <Container>
      <Content>
        {error && <>{error}</>}
        {loading && <>Загрузка</>}
        {region && (
          <>
            <Modal active={updateModalRegion} setActive={setUpdateModalRegion}>
              <UpdateRegion region={region} />
            </Modal>
            <Modal active={deleteModalRegion} setActive={setDeleteModalRegion}>
              <DeleteRegion region={region} />
            </Modal>
            <img
              src={region.image}
              style={{
                minHeight: 10,
                maxHeight: 70,
                minWidth: 10,
                maxWidth: 70,
              }}
            />
            {region.name}
            <button onClick={() => setUpdateModalRegion(true)}>Изменить</button>
            <button onClick={() => setDeleteModalRegion(true)}>Удалить</button>
            <NavBar>
              <TabElement>
                <Link to={"championships?id=" + region.id + ""}>
                  Чемпионаты
                </Link>
              </TabElement>
              <TabElement>
                <Link to="teams">Команды</Link>
              </TabElement>
            </NavBar>

            <Routes>
              <Route
                path="/championships"
                element={<RegionalChampionships regionId={region.id} />}
              />
              <Route
                path="/teams"
                element={<RegionalTeams regionId={region.id} />}
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
  width: 1600px;
  height: 850px;
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
