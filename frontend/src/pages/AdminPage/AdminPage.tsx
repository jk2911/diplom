import { Container, Tab, Row, Col, Nav } from "react-bootstrap";
import styled from "styled-components";
import { AllRegions } from "./Regions";
import { AllUsers } from "./Users";
import { AllTeams } from "./Teams";
import { AllChampionships } from "./Championships";

export function AdminPage() {
    // const suka = (eventKey:any)=> 

  return (
    <Container>
      <Tab.Container id="ledt-tabs-example" defaultActiveKey="regions">
        <Row>
          <Nav variant="pills" className="flex-row mt" >
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="regions">Регионы</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="championships">Чемпионаты</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="teams">Команды</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="users">Пользователи</Nav.Link>
              </Nav.Item>
            </Col>
          </Nav>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="regions">
                <AllRegions/>
              </Tab.Pane>
              <Tab.Pane eventKey="championships">
                <AllChampionships/>
              </Tab.Pane>
              <Tab.Pane eventKey="teams">
                <AllTeams/>
              </Tab.Pane>
              <Tab.Pane eventKey="users">
                <AllUsers/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

const CustomNavLink = styled(Nav.Link)`
    color: black;
    background-color: aliceblue;
`


