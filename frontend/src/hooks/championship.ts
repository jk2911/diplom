import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IRegion } from "../entity/Region";
import { IUpcomingMatches } from "../entity/UpcomingMatches";

export function useChampionshipSortedByRegionsTodays() {
  const [championships, setChampionships] = useState<IUpcomingMatches[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchChampionship() {
    try {
      setLoading(true);
      const response = await axios.get<IUpcomingMatches[]>(
        "https://localhost:7167/api/Match/upcoming-matches"
      );
      console.log(response.data)
      setChampionships(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchChampionship();
  }, []);
  return { championships, error, loading };
}