import { useState } from "react";
import { IRegion } from "../../../entity/Region";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  region: IRegion;
}

export function UpdateRegion({ region }: Props) {
  const [button, setButton] = useState("Изменить");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [regionName, setRegionName] = useState(region.name);
  const navigate = useNavigate();

  const UpdateRegion = async () => {
    //event.preventDefault();
    setButton("Изменение...");

    try {
      const response = await axios.delete(
        "https://localhost:7167/api/Region/DeleteRegion?id=" + region.id
      );
      navigate("admin/region/championships?id=" + region.id);
      //   const message = response.data as String;
      //   setErrorMessage(message.toString());
    } catch (e: unknown) {
      const error = e as AxiosError;
      // console.log(error.message);
      // console.log(error.response?.data);
      const message = error.response?.data as String;
      setErrorMessage(message.toString());
      setButton("Изменить");
    }
    // navigate("admin/region/championships?id=" + region.id);
  };

  const AddImage = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div>Изменение региона </div>
      <input
        type="number"
        value={regionName}
        onChange={(e) => setRegionName(e.target.value)}
      />
      <input
        type="file"
        accept="image/*,.png,.jpg,.gif,.web"
        onChange={AddImage}
      />
      <div>{errorMessage}</div>
      <div>
        <button onClick={UpdateRegion}>{button}</button>
      </div>
    </>
  );
}
