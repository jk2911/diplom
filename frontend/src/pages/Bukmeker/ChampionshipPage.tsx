import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import { useChampionship } from "../../hooks/championship";
import styled from "styled-components";
import { NavBar } from "../../components/Bar/NavBar";
import { ChampionshipTeams } from "../ChampionshipPage/ChampionshipTeams";
import { MatchCalendar } from "../ChampionshipPage/MatchCalendar";
import { ResultsMatch } from "../ChampionshipPage/ResultsMatch";
import { BukmekerCalendarMatches } from "./CalendarMatches";

export function BukmekerChampionshipPage() {
    const [params, setParams] = useSearchParams();

    const id = Number(params.get("id"));

    const { championship, error, loading } = useChampionship(id);

    return (<Container>
        <Content>
            {championship && (
                <div>
                    {championship.id} {championship.name} {championship.region.name}
                    <img
                        src={championship.image}
                        style={{
                            minHeight: 10,
                            maxHeight: 70,
                            minWidth: 10,
                            maxWidth: 70,
                        }}
                    />
                    <NavBar>
                        <TabElement>
                            <Link to={"calendar?id=" + championship.id}>Календарь</Link>
                        </TabElement>
                        <TabElement>
                            <Link to={"results?id=" + championship.id}>Результаты</Link>
                        </TabElement>
                    </NavBar>
                    <Routes>

                        <Route
                            path="/calendar"
                            element={<BukmekerCalendarMatches id={championship.id} />}
                        />
                        <Route
                            path="/results"
                            element={<BukmekerCalendarMatches id={championship.id} />}
                        />
                    </Routes>
                </div>
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