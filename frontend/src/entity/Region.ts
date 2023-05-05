import { IChampionship } from "./Championship";

export interface IRegion {
  id: number;
  name: string;
  championships: IChampionship[];
}
