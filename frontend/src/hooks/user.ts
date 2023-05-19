import { useState, useEffect } from "react";
import { IUser } from "../entity/User";
import axios, { AxiosError } from "axios";
import { IHistoryUser } from "../entity/HistoryUser";

export function useUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRegions() {
    try {
      setLoading(true);
      const response = await axios.get<IUser[]>(
        "https://localhost:7167/api/User/GetUsers"
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

export function useUser(email: string) {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRegions() {
    try {
      setLoading(true);
      const response = await axios.get<IUser>(
        "https://localhost:7167/api/User/GetUser?email=" + email
      );
      setUser(response.data);
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
  return { user, error, loading };
}

export function useHistoryUser(id: number) {
  const [history, setHistory] = useState<IHistoryUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRegions() {
    try {
      setLoading(true);
      const response = await axios.get<IHistoryUser[]>(
        "https://localhost:7167/api/User/GetHistoryUser?id=" + id
      );
      setHistory(response.data);
      console.log(history)
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
  return { history, error, loading };
}
