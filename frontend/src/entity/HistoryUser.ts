import { IUser } from "./User";

export interface IHistoryUser{
    id:number,
    status:string,
    money:number,
    date:Date,
    userId:number,
    user:IUser
}