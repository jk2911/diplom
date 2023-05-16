import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IRegion } from "../entity/Region";
import { IUpcomingMatches } from "../entity/UpcomingMatches";
import { IMatch } from "../entity/Match";

export function useUpcomingMatchesSortedByRegion() {
  const [regions, setRegions] = useState<IUpcomingMatches[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRegions() {
    try {
      setLoading(true);
      const response = await axios.get<IUpcomingMatches[]>(
        "https://localhost:7167/api/Match/UpcomingMatches"
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

export function useCalendarOfChampionshipMatches(championshipId: number) {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchMatches() {
    try {
      setLoading(true);
      const response = await axios.get<IMatch[]>(
        "https://localhost:7167/api/Match/GetCalendarOfChampionshipMatches?id=" +
          championshipId
      );
      setMatches(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchMatches();
  }, []);
  return { matches, error, loading };
}

export function useChampionshipMatchResults(championshipId: number) {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchMatches() {
    try {
      setLoading(true);
      const response = await axios.get<IMatch[]>(
        "https://localhost:7167/api/Match/GetChampionshipMatchResults?id=" +
          championshipId
      );
      setMatches(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchMatches();
  }, []);
  return { matches, error, loading };
}

export function useCalendarOfTeamMatches(id: number) {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchMatches() {
    try {
      setLoading(true);
      const response = await axios.get<IMatch[]>(
        "https://localhost:7167/api/Match/GetCalendarOfTeamsMatches?id=" +
          id
      );
      setMatches(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchMatches();
  }, []);
  return { matches, error, loading };
}

export function useTeamMatchResults(id: number) {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchMatches() {
    try {
      setLoading(true);
      const response = await axios.get<IMatch[]>(
        "https://localhost:7167/api/Match/GetTeamsMatchResults?id=" +
          id
      );
      setMatches(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchMatches();
  }, []);
  return { matches, error, loading };
}
