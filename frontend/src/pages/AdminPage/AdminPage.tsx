import { Container, Tab, Row, Col, Nav } from "react-bootstrap";
import styled from "styled-components";
import { AllRegions } from "./Regions";
import { AllUsers } from "./Users";
import { AllTeams } from "./Teams";

export function AdminPage() {
    // const suka = (eventKey:any)=> 

  return (
    <Container>
      <Tab.Container id="ledt-tabs-example" defaultActiveKey="first">
        <Row>
          <Nav variant="pills" className="flex-row mt" >
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="first">Чемпионаты</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="second">Команды</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="third">Пользователи</Nav.Link>
              </Nav.Item>
            </Col>
          </Nav>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <AllRegions/>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <AllTeams/>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
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


