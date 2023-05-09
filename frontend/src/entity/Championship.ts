import { IMatch } from "./Match";
import { IRegion } from "./Region";

export interface IChampionship {
  id: number;
  name: string;
  isPopular: boolean;
  matches: IMatch[];
  region: IRegion;
}
