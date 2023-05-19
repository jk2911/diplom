import { useEffect, useState } from "react";
import { useTeamNotInChampionship } from "../../../hooks/team";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  setClose: any;
}

export function AddTeamInChampionship({ id, setClose }: Props) {
  const { teams, error, loading } = useTeamNotInChampionship(id);
  const [team, setTeam] = useState(0);
  const navigate = useNavigate();

  const AddTeam = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7167/api/Championship/AddTeam/" + id + "-" + team
      );
      const message = response.data as String;
      console.log(message.toString());
      //setErrorMessage(message.toString());
      setClose(true);
      window.location.assign("/admin/championship/teams?id=" + id)
    } catch (e: unknown) {
      const error = e as AxiosError;
      // console.log(error.message);
      // console.log(error.response?.data);
      const message = error.response?.data as String;
      //setErrorMessage(message.toString());
    }
    navigate("/admin/championship/teams?id=" + id);
  };

  useEffect(() => {
    setTeam(teams == null || teams.length < 1 ? 0 : teams[0].id);
  }, [teams]);

  const setSelectedTeam = (str: string) => {
    setTeam(Number(str));
  };

  return (
    <div>
      Добавить команду:{" "}
      <select onChange={(e) => setSelectedTeam(e.target.value)}>
        {loading && <>Загрузка</>}
        {teams.map((t) => (
          <option value={t.id}>
            {t.name}({t.region.name})
          </option>
        ))}
      </select>
      <button onClick={AddTeam}>Подтвердить</button>
    </div>
  );
}
