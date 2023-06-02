import { useState } from "react";
import { IMatch } from "../../../entity/Match";
import axios, { AxiosError } from "axios";

interface Props {
    id: number;
  }
  
  export function DeleteMatch({ id }: Props) {
    const [button, setButton] = useState("Подтвердить");
    const [errorMessage, setErrorMessage] = useState("");
  
    const Remove = async () => {
      //event.preventDefault();
      setButton("Удаление...");
  
      try {
        const response = await axios.delete(
          "https://localhost:7167/api/Match/DeleteMatch?id=" + id
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
      window.location.assign("/admin");
      setButton("Подтвердить");
    };
  
    return (
      <>
        <div style={{marginBottom:"20px"}}>Удалить матч</div>
        <div>{errorMessage}</div>
        <div>
          <button onClick={Remove}>{button}</button>
        </div>
      </>
    );
  }