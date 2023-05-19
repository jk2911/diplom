import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { IUser } from "../entity/User";
import { IUserBet } from "../entity/UserBets";

export function useUserBets(id: number) {
  const [bets, setBets] = useState<IUserBet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRegions() {
    try {
      setLoading(true);
      const response = await axios.get<IUserBet[]>(
        "https://localhost:7167/api/Bet/GetUserBets?id=" + id
      );
      setBets(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchRegions();
  }, []);
  return { bets, error, loading };
}
