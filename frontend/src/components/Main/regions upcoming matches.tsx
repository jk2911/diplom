import { Col, Container, Row } from "react-bootstrap";
import { useRegionsUpcomingMatches } from "../../hooks/region";
import { useEffect } from "react";
import { useTypesSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/action-creators/user";

interface Props {
  championship: number;
  setChampionship: (id: number) => void;
}

export function RegionsUpcomingMatches({
  championship,
  setChampionship,
}: Props) {
  const { regions, error, loading } = useRegionsUpcomingMatches();

  const {user, error:r, loading:l} = useTypesSelector((state) => state.user);
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   dispatch(fetchUser("333", "333"))
  // },[])

  console.log(user);

  return (
    <Row>
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

/* <Row>
            <details open>
              <summary>Легенда</summary>
              <p>Раскрывающийся текст</p>
            </details>
          </Row> */
