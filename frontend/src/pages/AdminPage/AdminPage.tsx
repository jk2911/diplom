import { Tab, Row, Col, Nav } from "react-bootstrap";
import styled from "styled-components";
import { AllRegions } from "./Regions";
import { AllUsers } from "./Users";
import { AllTeams } from "./Teams";
import { AllChampionships } from "./Championships";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

export function AdminPage() {
  // const suka = (eventKey:any)=>

  return (
    <Container>
      <Content>
      <TabsContainer>
        <TabElement>
          <Link to="regions">Регионы</Link>
        </TabElement>
        <TabElement>
          <Link to="championships">Чемпионаты</Link>
        </TabElement>
        <TabElement>
          <Link to="teams">Команды</Link>
        </TabElement>
        <TabElement>
          <Link to="users">Пользователи</Link>
        </TabElement>
      </TabsContainer>

      
        <Routes>
          <Route path="/regions" element={<AllRegions />} />
          <Route path="/championships" element={<AllChampionships />} />
          <Route path="/teams" element={<AllTeams />} />
          <Route path="/users" element={<AllUsers />} />
        </Routes>
      </Content>
    </Container>
  );
}

const CustomNavLink = styled(Nav.Link)`
  color: black;
  background-color: aliceblue;
`;

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
  width: 1600px;
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
