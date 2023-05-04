import { IUpcomingMatches } from "../entity/UpcomingMatches";
import { RegionalChampionship } from "./regional championship";

interface RegionMatchesProps {
  region: IUpcomingMatches;
}

export function RegionMatches({ region }: RegionMatchesProps) {
  return (
    <>
        {region.championships.map((ch)=>(
            <RegionalChampionship championship={ch} key={ch.id}/>
        ))}
    </>
  );
}