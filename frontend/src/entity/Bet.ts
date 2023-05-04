import { IBetValue } from "./BetValue";

export interface IBet{
    id:number,
    name:string,
    matchId:number,
    values:IBetValue[]
}