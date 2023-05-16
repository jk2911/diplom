import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IRegion } from "../entity/Region";
import { IUpcomingMatches } from "../entity/UpcomingMatches";
import { IRegionsUpcomingMatches } from "../entity/RegionsUpcomingMatches";

export function useRegionsUpcomingMatches() {
  const [regions, setRegions] = useState<IRegionsUpcomingMatches[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRegions() {
    try {
      setLoading(true);
      const response = await axios.get<IRegionsUpcomingMatches[]>(
        "https://localhost:7167/api/Region/GetRegionsUpcomingMatches"
      );
      setRegions(response.data);
      setLoading(false);
      console.log(response.data)
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

export function useAllRegions() {
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRegions() {
    try {
      setLoading(true);
      const response = await axios.get<IRegion[]>(
        "https://localhost:7167/api/Region/GetRegions"
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

export function useRegion(id: number) {
  const [region, setRegion] = useState<IRegion>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRegions() {
    try {
      setLoading(true);
      const response = await axios.get<IRegion>(
        "https://localhost:7167/api/Region/GetRegion?id=" + id
      );
      setRegion(response.data);
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
  return { region, error, loading };
}
