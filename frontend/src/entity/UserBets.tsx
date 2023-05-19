import { IBetValue } from "./BetValue";
import { IUser } from "./User";

export interface IUserBet {
    id: number,
    userId: number,
    user: IUser,
    betValueId: number,
    betValue: IBetValue,
    money: number
}