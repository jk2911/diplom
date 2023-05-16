import { IChampionship } from "./Championship";

export interface IRegionsUpcomingMatches {
    id:number;
    region:string,
    championships:IChampionship[]
  }