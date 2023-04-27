import { IChampionship } from "./Championship";

export interface IChampioshipSortedByRegion {
    id:number;
    region:string,
    championships: IChampionship[]
  }
  