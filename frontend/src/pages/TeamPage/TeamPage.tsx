import { useSearchParams } from "react-router-dom";
import { useTeam } from "../../hooks/team";
import styled from "styled-components";

export function TeamPage() {
  const [params, setParams] = useSearchParams();

  const id = params.get("id");

  const { team, error, loading } = useTeam(Number(id));

  return (
    <Container>
      <Content>{team && <>{team.id} {team.name}</>}</Content>
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
  width: 1600px;
  /* height: 850px; */
  background-color: whitesmoke;
`;
