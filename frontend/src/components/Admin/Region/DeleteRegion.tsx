import { useState } from "react";
import { IRegion } from "../../../entity/Region";
import axios, { AxiosError } from "axios";

interface Props {
  region: IRegion;
}

export function DeleteRegion({ region }: Props) {
  const [button, setButton] = useState("Подтвердить");
  const [errorMessage, setErrorMessage] = useState("");

  const RemoveRegion = async () => {
    //event.preventDefault();
    setButton("Удаление...");

    try {
      const response = await axios.delete(
        "https://localhost:7167/api/Region/DeleteRegion?id=" + region.id
      );
      window.location.assign("/admin/regions");
    } catch (e: unknown) {
      const error = e as AxiosError;
      // console.log(error.message);
      // console.log(error.response?.data);
      const message = error.response?.data as String;
      setErrorMessage(message.toString());
    }
    //window.location.assign("/admin/regions");
  };

  return (
    <>
      <div>Удалить команду {region.name}</div>
      <div>{errorMessage}</div>
      <div>
        <button onClick={RemoveRegion}>{button}</button>
      </div>
    </>
  );
}
