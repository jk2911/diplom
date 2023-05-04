import { Col, Container, Row } from "react-bootstrap";
import { useRegionsUpcomingMatches } from "../../hooks/region";
import { useUpcomingMatchesSortedByRegion } from "../../hooks/match";
import { IRegion } from "../../entity/Region";
import { IUpcomingMatches } from "../../entity/UpcomingMatches";
import { IChampionship } from "../../entity/Championship";
import { match } from "assert";

export function UpcomingMatchesSortedByRegion() {
  const { regions, error, loading } = useUpcomingMatchesSortedByRegion();

  return (
    <Row>
      {regions.map((region) => (
        <>{Region(region)}</>
      ))}
    </Row>
  );
}

function Region(region: IUpcomingMatches) {
  return (
    <details>
      <summary>{region.region}</summary>
      {region.championships.map((ch) => (
        <>{Championship(ch)}</>
      ))}
    </details>
  );
}

function Championship(championship :IChampionship){
    return(
        <details>
            <summary>{championship.name}</summary>
            <>{championship.matches.map((match)=>(
                <>
                <p>{match.home.name}-{match.away.name}-{match.bets[0].values[0].value}-{match.bets[0].values[2].value}-{match.bets[0].values[1].value}</p>
                {match.home.name}-{match.away.name}-{match.bets[0].values[0].name}-{match.bets[0].values[2].name}-{match.bets[0].values[1].name}
                </>
        ))}</>
        </details>
    )
}

