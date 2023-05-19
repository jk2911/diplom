import { useSearchParams } from "react-router-dom";
import { useChampionship } from "../../hooks/championship";
import styled from "styled-components";

export function BukmekerChampionshipPage() {
    const [params, setParams] = useSearchParams();

    const id = Number(params.get("id"));

    const { championship, error, loading } = useChampionship(id);

    return (<Container>
        <Content>
            {championship && (
                <>{championship.name}</>
            )}
        </Content>
    </Container>)
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
  width: 80vw;
  /* height: 850px; */
  background-color: whitesmoke;
`;