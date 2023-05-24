export interface IUser {
  id: number;
  email: string;
  token: string;
  role: string;
  money: number;
}

export interface IToken {
  email: string;
  id: string;
  role: string;
  money: string;
}
