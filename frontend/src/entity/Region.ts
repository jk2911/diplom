import { IChampionship } from "./Championship";

export interface IRegion {
  id: number;
  name: string;
  image: string;
  championships: IChampionship[];
}
