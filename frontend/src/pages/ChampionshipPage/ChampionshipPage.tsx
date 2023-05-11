import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useChampionship } from "../../hooks/championship";
import { useRegion } from "../../hooks/region";

export function ChampionshipPage() {
  const [params, setParams] = useSearchParams();

  const id = params.get("id");

  const { championship, error, loading } = useChampionship(Number(id));

  return (
    <Container>
      <Content>
        {championship && (
          <>
            {championship.id} {championship.name}
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
