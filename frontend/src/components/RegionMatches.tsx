import styled from "styled-components";
import { IUpcomingMatches } from "../entity/UpcomingMatches";
import { RegionalChampionship } from "./regional championship";

interface RegionMatchesProps {
  region: IUpcomingMatches;
}

export function RegionMatches({ region }: RegionMatchesProps) {
  return (
    <RegionMatchContainer>
        {region.championships.map((ch)=>(
            <RegionalChampionship championship={ch} key={ch.id}/>
        ))}
    </RegionMatchContainer>
  );
}

const RegionMatchContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 880px;
  min-height: 699px;`
  // background-color: ${colors.white};