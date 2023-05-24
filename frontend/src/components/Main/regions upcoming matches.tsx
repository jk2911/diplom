import { Col, Container, Row } from "react-bootstrap";
import { useRegionsUpcomingMatches } from "../../hooks/region";
import { useEffect } from "react";
import { useTypesSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/action-creators/user";
import styled from "styled-components";

interface Props {
  championship: number;
  setChampionship: (id: number) => void;
}

export function RegionsUpcomingMatches({
  championship,
  setChampionship,
}: Props) {
  const { regions, error, loading } = useRegionsUpcomingMatches();

  return (
    <Row>
      {loading && <>Загрузка</>}
      {regions.length != 0 && (<ButtonCon onClick={() => setChampionship(0)}>Все</ButtonCon>)}
      {regions.map((region) => (
        <Container key={region.id}>
          <details>
            <summary>{region.region}</summary>
            {region.championships.map((ch) => (
              <div key={ch.id} onClick={() => setChampionship(ch.id)}>{ch.name}</div>
            ))}
          </details>
        </Container>
      ))}
    </Row>
  );
}

const ButtonCon = styled.button`
  width: 100px;
`;    
