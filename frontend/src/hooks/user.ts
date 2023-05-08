import { useState, useEffect } from "react";
import { IUser } from "../entity/User";
import axios, { AxiosError } from "axios";

export function useUsers() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    async function fetchRegions() {
      try {
        setLoading(true);
        const response = await axios.get<IUser[]>(
          "https://localhost:7167/api/User/get-users"
        );
        setUsers(response.data);
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
    return { users, error, loading };
  }