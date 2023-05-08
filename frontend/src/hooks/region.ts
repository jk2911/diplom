import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IRegion } from "../entity/Region";
import { IUpcomingMatches } from "../entity/UpcomingMatches";

export function useRegionsUpcomingMatches() {
  const [regions, setRegions] = useState<IUpcomingMatches[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRegions() {
    try {
      setLoading(true);
      const response = await axios.get<IUpcomingMatches[]>(
        "https://localhost:7167/api/Region/get-regions-upcoming-matches"
      );
      setRegions(response.data);
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
  return { regions, error, loading };
}

export function useAllRegions(){
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRegions() {
    try {
      setLoading(true);
      const response = await axios.get<IRegion[]>(
        "https://localhost:7167/api/Region/get-regions"
      );
      setRegions(response.data);
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
  return { regions, error, loading };
}
