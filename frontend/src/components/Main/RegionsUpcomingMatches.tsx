import { Col, Container, Row } from "react-bootstrap";
import { useRegionsUpcomingMatches } from "../../hooks/region";
import { useEffect } from "react";
import { useTypesSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/action-creators/user";
import styled from "styled-components";
import image from "../../assets/region.jpg"

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
      {/* {loading && <>Загрузка</>} */}
      {regions.length != 0 && (<Container style={{ marginBottom: "5px" }}><ButtonCon onClick={() => setChampionship(0)}>Все</ButtonCon></Container>)}
      {regions.map((region) => (
        <Container key={region.id}>
          <details>
            <summary style={{ borderRadius: "3px", display:"flex", flexDirection:"row" }}>
              <div>
                <img
                  src={region.image != null ? region.image : image}
                  style={{ minHeight: 10, maxHeight: 30, minWidth: 10, maxWidth: 30, marginRight:"5px" }}
                />
              </div><div>{region.region}</div></summary>
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
  border-radius: 3px;
`;    
