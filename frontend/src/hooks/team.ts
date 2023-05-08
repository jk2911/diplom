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
          "https://localhost:7167/api/Team/get-teams"
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