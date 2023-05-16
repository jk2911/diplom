import { Col, Container, Row } from "react-bootstrap";
import { useRegionsUpcomingMatches } from "../../hooks/region";
import { useUpcomingMatchesSortedByRegion } from "../../hooks/match";
import { IRegion } from "../../entity/Region";
import { IUpcomingMatches } from "../../entity/UpcomingMatches";
import { IChampionship } from "../../entity/Championship";
import { match } from "assert";
import { IMatch } from "../../entity/Match";
import styled from "styled-components";

export function UpcomingMatchesSortedByRegion() {
  const { regions, error, loading } = useUpcomingMatchesSortedByRegion();

  return (
    <Row>
      <table>
        {regions.map((region) =>
          region.championships.map((ch) => Championship(ch, region.region))
        )}
      </table>
    </Row>
  );
}

function Championship(championship: IChampionship, regionName: string) {
  return (
    <>
      <ChampionshipTr>
        <img
          src={championship.image}
          style={{ minHeight: 10, minWidth: 10, maxHeight: 20, maxWidth: 20 }}
        />
        {championship.name}.{regionName}
      </ChampionshipTr>
      <tr>{championship.matches.map((match) => Match(match))}</tr>
    </>
  );
}

function Match(match: IMatch) {
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


  return (
    <div>
      <TeamsTd>
        {match.home.name} - {match.away.name}
      </TeamsTd>
      <ValueTd>{P1?.value}</ValueTd> <ValueTd>{P2?.value} </ValueTd>
      <ValueTd>{X?.value}</ValueTd>
      <ValueTd>{IX?.value} </ValueTd>
      <ValueTd>{I2?.value} </ValueTd>
      <ValueTd>{X2?.value}</ValueTd>
      <ValueTd>{G25More?.value} </ValueTd>
      <ValueTd>{G25Less?.value}</ValueTd>
    </div>
  );
}

const TeamsTd = styled.td`
  width: 500px;
`;
const ValueTd = styled.td`
  width: 40px;
  border: 1px solid gray;
`;

const ChampionshipTr = styled.td`
  background-color: #dcdcdc;
  margin-top: 100px;
`;
