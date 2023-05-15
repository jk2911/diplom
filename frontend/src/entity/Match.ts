import { IBet } from "./Bet";
import { ITeam } from "./Team";

export interface IMatch{
    id:number;
    dateTime:Date;
    homeId:number,
    home:ITeam,
    awayId:number,
    away:ITeam,
    homeGoal:number;
    awayGoal:number;
    bets:IBet[]
}