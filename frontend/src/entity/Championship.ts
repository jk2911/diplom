import { IMatch } from "./Match";

export interface IChampionship {
    id: number;
    name: string;
    isPopular: boolean;
    matches:IMatch[]
  }
  