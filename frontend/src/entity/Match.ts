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
    bets:IBet[];
    cornerHome:number;
    cornerAway:number;
    shotsHome:number;
    shotsAway:number;
    shotsInTargetHome:number;
    shotsInTargetAway:number;
    saveHome:number;
    saveAway:number;
    possession:number;
    foulsHome:number;
    foulsAway:number;
    offsideHome:number;
    offsideAway:number;
    yellowCardHome:number;
    yellowCardAway:number;
    redCardHome:number;
    redCardAway:number;
}