import { Col, Container, Row } from "react-bootstrap";
import { useRegionsUpcomingMatches } from "../../hooks/region";
import { useUpcomingMatchesSortedByChampionships } from "../../hooks/match";
import { IRegion } from "../../entity/Region";
import { IUpcomingMatches } from "../../entity/UpcomingMatches";
import { IChampionship } from "../../entity/Championship";
import { match } from "assert";
import { IMatch } from "../../entity/Match";
import styled from "styled-components";
import { useEffect, useState } from "react";
// import image from "D:/bstu/diplom/frontend/src/assets/main_matches.jpg";
import image from "../../assets/main_matches.jpg";

interface Props {
  championship: number;
  setChampionship: (id: number) => void;
}

export function UpcomingMatchesSortedByRegion({
  championship,
  setChampionship,
}: Props) {
  const { championships, error, loading } =
    useUpcomingMatchesSortedByChampionships();
  const [selectedChampionships, setSelectedChampionhships] = useState<
    IUpcomingMatches[]
  >([]);

  useEffect(() => {
    setSelectedChampionhships(championships);
  }, [championships]);

  useEffect(() => {
    setRegions();
  }, [championship]);

  const setRegions = () => {
    if (championships.length < 1) return;

    if (championship == 0) {
      setSelectedChampionhships(championships);
      return;
    }

    setSelectedChampionhships(
      championships.filter((c) => c.championship.id == championship)
    );
  };

  const date = new Date();

  return (
    <Row>
      {/* {NormalDate(date.getDate())}.{NormalDate(date.getMonth()+1)}.{NormalDate(date.getFullYear())} */}
      {loading && <>Загрузка</>}
      {selectedChampionships.map((ch) => (
        <div key={ch.id} style={{ marginTop: "9px" }}>
          <ChampionshipTr>
            {/* <img
              src={ch.championship.image}
              style={{
                minHeight: 10,
                minWidth: 10,
                maxHeight: 20,
                maxWidth: 20,
              }}
            /> */}
            <div>
              {ch.championship.region.name}.{ch.championship.name}
            </div>
          </ChampionshipTr>
          <MatchContainer>
            <TeamsTd>Событие</TeamsTd>
            <DateTd>Время</DateTd>
            <Values>
              <ValueTdName>П1</ValueTdName>
              <ValueTdName>Х</ValueTdName>
              <ValueTdName>П2</ValueTdName>
              <ValueTdName>1X</ValueTdName>
              <ValueTdName>12</ValueTdName>
              <ValueTdName>Х2</ValueTdName>
              <ValueTdName>Б</ValueTdName>
              <ValueTdName>М</ValueTdName>
            </Values>
          </MatchContainer>
          {ch.matches.map((match) => (
            <Match match={match} key={match.id} />
          ))}
        </div>
      ))}
    </Row>
  );
}

interface MatchProps {
  match: IMatch;
}

function Match({ match }: MatchProps) {
  function toMatch(id: number) {
    window.location.assign("/match?id=" + id);
  }

  const Issue = match.bets.find((x) => x.name == "Исход");

  const P1 = Issue?.values.find((i) => i.name == "П1");
  const P2 = Issue?.values.find((i) => i.name == "П2");
  const X = Issue?.values.find((i) => i.name == "X");

  const DoubleChance = match.bets.find((x) => x.name == "Двойной шанс");

  const IX = DoubleChance?.values.find((i) => i.name == "1X");
  const I2 = DoubleChance?.values.find((i) => i.name == "12");
  const X2 = DoubleChance?.values.find((i) => i.name == "X2");

  const Goals = match.bets.find((x) => x.name == "Тотал");

  const G25More = Goals?.values.find((i) => i.name == "Больше 2.5");
  const G25Less = Goals?.values.find((i) => i.name == "Меньше 2.5");

  const d = new Date(match.dateTime);

  return (
    <MatchContainer>
      <TeamsTd onClick={() => toMatch(match.id)}>
        {match.home.name} - {match.away.name}
      </TeamsTd>
      <DateTd>
        {NormalDate(d.getDate())}.{NormalDate(d.getMonth() + 1)}{" "}
        {NormalDate(d.getHours())}:{NormalDate(d.getMinutes())}
      </DateTd>
      <Values>
        <ValueTd>{Value(P1?.value)}</ValueTd>
        <ValueTd>{Value(P2?.value)} </ValueTd>
        <ValueTd>{Value(X?.value)}</ValueTd>
        <ValueTd>{Value(IX?.value)} </ValueTd>
        <ValueTd>{Value(I2?.value)} </ValueTd>
        <ValueTd>{Value(X2?.value)}</ValueTd>
        <ValueTd>{Value(G25More?.value)} </ValueTd>
        <ValueTd>{Value(G25Less?.value)}</ValueTd>
      </Values>
    </MatchContainer >
  );
}

const MatchContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`

const TeamsTd = styled.div`
  width: 30%;
`;

const Values = styled.div`
  width:50%;
  display:flex;
  justify-content: center;
  flex-direction: row;
`

const ValueTd = styled.div`
  text-align: center;
  margin-right: 3px;
  width: 50px;
  height: 25px;
  min-height: 25px;
  max-height: 25px;
  border: 1px solid gray;
`;

const ValueTdName = styled.div`
  text-align: center;
  margin-right: 3px;
  width: 50px;
  height: 25px;
  min-height: 25px;
  max-height: 25px;
`;

const ChampionshipTr = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #dcdcdc;
  width: 100%;
  height: 20px;
  min-height: 20px;
  min-width: 100%;
  max-height: 20px;
  max-width: 100%;
  margin-top: 5px;
`;

const DateTd = styled.div`
  width: 20%;
`;

export function NormalDate(num: number): string {
  if (num < 10) return "0" + num;
  return num + "";
}

function Value(value: number | undefined): string {
  if (value == null || value == undefined) return "-";
  return value + "";
}
