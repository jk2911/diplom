import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IRegion } from "../entity/Region";
import { IUpcomingMatches } from "../entity/UpcomingMatches";
import { IChampionship } from "../entity/Championship";

export function useAllChampionships() {
  const [championships, setChampionships] = useState<IChampionship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchChampionship() {
    try {
      setLoading(true);
      const response = await axios.get<IChampionship[]>(
        "https://localhost:7167/api/Championship/GetChampionships"
      );
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

export function useRegionalChampionship(regionId: number) {
  const [championships, setChampionships] = useState<IChampionship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchChampionship() {
    try {
      setLoading(true);
      const response = await axios.get<IChampionship[]>(
        "https://localhost:7167/api/Championship/GetRegionalChampionships?regionId=" +
          regionId
      );
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

export function useChampionship(id: number) {
  const [championship, setChampionship] = useState<IChampionship>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchChampionship() {
    try {
      setLoading(true);
      const response = await axios.get<IChampionship>(
        "https://localhost:7167/api/Championship/GetChampionship?id=" + id
      );
      setChampionship(response.data);
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
  return { championship, error, loading };
}
