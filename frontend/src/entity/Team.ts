import { IRegion } from "./Region";

export interface ITeam{
    id:number,
    name:string,
    pathToImage:string,
    region:IRegion
}