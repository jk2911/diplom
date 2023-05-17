import { useEffect, useState } from "react";
import { ITeam } from "../entity/Team";
import axios, { AxiosError } from "axios";

export function useTeams() {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTeams() {
    try {
      setLoading(true);
      const response = await axios.get<ITeam[]>(
        "https://localhost:7167/api/Team/GetTeams"
      );
      setTeams(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);
  return { teams, error, loading };
}

export function useRegionalTeams(regionId: number) {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTeams() {
    try {
      setLoading(true);
      const response = await axios.get<ITeam[]>(
        "https://localhost:7167/api/Team/GetRegionalTeams?regionId=" + regionId
      );
      setTeams(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);
  return { teams, error, loading };
}

export function useTeam(id: number) {
  const [team, setTeam] = useState<ITeam>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTeam() {
    try {
      setLoading(true);
      const response = await axios.get<ITeam>(
        "https://localhost:7167/api/Team/GetTeam?id=" + id
      );
      setTeam(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchTeam();
  }, []);
  return { team, error, loading };
}

export function useTeamNotInChampionship(id: number) {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTeams() {
    try {
      setLoading(true);
      const response = await axios.get<ITeam[]>(
        "https://localhost:7167/api/Team/GetTeamNotInChampionship?id=" + id
      );
      setTeams(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);
  return { teams, error, loading };
}
