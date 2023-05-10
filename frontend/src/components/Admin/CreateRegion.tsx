import axios, { AxiosError } from "axios";
import { useState } from "react";

export function CreateRegion() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [buttonState, setButton] = useState("Создать");
  const [errorCreate, setErrorCreate]=useState("");

  const FetchCreateRegion = async (event: any) => {
    //event.preventDefault();
    event.stopPropagation();
    setButton("Создание");

    const formData = new FormData();
    formData.append("name", name);

    if (image != null) formData.append("image", image);

    try {
      const responce = await axios.post(
        "https://localhost:7167/api/Region/create-region",
        formData
      );
    } catch (e: unknown) {
      const error = e as AxiosError;
      // console.log(error.message);
      // console.log(error.response?.data);
      const message = error.response?.data as String;
      setErrorCreate(message.toString());
    }
    setButton("Создать");
  };

  const AddImage = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      название <input value={name} onChange={(e) => setName(e.target.value)} />
      
      <input
        type="file"
        accept="image/*,.png,.jpg,.gif,.web"
        onChange={AddImage}
      />
      {errorCreate}
      <button onClick={FetchCreateRegion}>{buttonState}</button>
    </>
  );
}
