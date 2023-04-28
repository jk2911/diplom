import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IRegion } from "../entity/Region";
import { IChampioshipSortedByRegion } from "../entity/ChampionshipSortedByRegion";

export function useChampionshipSortedByRegionsTodays() {
  const [championships, setChampionships] = useState<IChampioshipSortedByRegion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchChampionship() {
    try {
      setLoading(true);
      const response = await axios.get<IChampioshipSortedByRegion[]>(
        "https://localhost:7167/api/Championship/championships-sorted-by-regions"
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