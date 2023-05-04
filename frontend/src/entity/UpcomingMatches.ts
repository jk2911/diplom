import { IChampionship } from "./Championship";

export interface IUpcomingMatches {
    id:number;
    region:string,
    championships:IChampionship[]
  }
  