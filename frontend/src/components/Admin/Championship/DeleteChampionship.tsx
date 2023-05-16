import { useState } from "react";
import { IRegion } from "../../../entity/Region";
import axios, { AxiosError } from "axios";
import { IChampionship } from "../../../entity/Championship";

interface Props {
  championship: IChampionship;
}

export function DeleteChampionship({ championship }: Props) {
  const [button, setButton] = useState("Подтвердить");
  const [errorMessage, setErrorMessage] = useState("");

  const Remove = async () => {
    //event.preventDefault();
    setButton("Удаление...");

    try {
      const response = await axios.delete(
        "https://localhost:7167/api/Championship/DeleteChampionship?id=" + championship.id
      );
      const message = response.data as String;
      setErrorMessage(message.toString());
    } catch (e: unknown) {
      const error = e as AxiosError;
      // console.log(error.message);
      // console.log(error.response?.data);
      const message = error.response?.data as String;
      setErrorMessage(message.toString());
    }
    window.location.assign("/admin/championships");
  };

  return (
    <>
      <div>Удалить чемпионат {championship.name}</div>
      <div>{errorMessage}</div>
      <div>
        <button onClick={Remove}>{button}</button>
      </div>
    </>
  );
}