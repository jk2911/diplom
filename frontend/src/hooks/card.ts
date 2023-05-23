import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { IUserBet } from "../entity/UserBets";
import { ICard } from "../entity/Card";

export function useUserCards(id: number) {
    const [cards, setCards] = useState<ICard[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    async function fetchCards() {
      try {
        setLoading(true);
        const response = await axios.get<ICard[]>(
          "https://localhost:7167/api/Card/GetUserCards?id=" + id
        );
        setCards(response.data);
        setLoading(false);
      } catch (e: unknown) {
        const error = e as AxiosError;
        setLoading(false);
        setError(error.message);
      }
    }
  
    useEffect(() => {
      fetchCards();
    }, []);
    return { cards, error, loading };
  }