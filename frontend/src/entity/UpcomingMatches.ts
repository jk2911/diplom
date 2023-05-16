import { IChampionship } from "./Championship";
import { IMatch } from "./Match";

export interface IUpcomingMatches {
    id:number;
    championship:IChampionship,
    matches:IMatch[]
  }
  