import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IChampionship } from "../../../entity/Championship";

interface Props {
    ch: IChampionship;
  }
  
  export function UpdateChampionhsip({ ch }: Props) {
    const [button, setButton] = useState("Изменить");
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [chName, setChName] = useState(ch.name);
    const navigate = useNavigate();
  
    const UpdateRegion = async () => {
      //event.preventDefault();
      setButton("Изменение...");
  
      const formData = new FormData();
  
      formData.append("name", chName);
      if (image != null) formData.append("image", image);
  
      try {
        const response = await axios.put(
          "https://localhost:7167/api/Championship/EditChampionship?id=" + ch.id,
          formData
        );
        window.location.assign("/admin/championship/teams?id=" + ch.id);
      } catch (e: unknown) {
        const error = e as AxiosError;
        // console.log(error.message);
        // console.log(error.response?.data);
        const message = error.response?.data as String;
        console.log(message.toString());
        setErrorMessage(message.toString());
        setButton("Изменить");
      }
      setButton("Изменить");
    };
  
    const AddImage = (e: any) => {
      setImage(e.target.files[0]);
    };
  
    return (
      <>
        <div>Изменение чемпионата</div>
        <input
          type="text"
          value={chName}
          onChange={(e) => setChName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*,.png,.jpg"
          onChange={AddImage}
        />
        <div>{errorMessage}</div>
        <div>
          <button onClick={UpdateRegion}>{button}</button>
        </div>
      </>
    );
  }