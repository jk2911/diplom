import { IChampionship } from "./Championship";

export interface IRegionsUpcomingMatches {
    id:number;
    region:string,
    image:string,
    championships:IChampionship[]
  }