import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAllRegions } from "../../hooks/region";

export function CreateChampionship() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [buttonState, setButton] = useState("Создать");
  const [errorCreate, setErrorCreate] = useState("");
  const [region, setRegion] = useState("Испания");
  const { regions, error, loading } = useAllRegions();

  useEffect(() => {
    setRegion(regions == null || regions.length < 1 ? "Мир" : regions[0].name);
  }, [regions]);

  const FetchCreateChampionship = async (event: any) => {
    //event.preventDefault();
    event.stopPropagation();
    setButton("Создание");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("region", region);

    if (image != null) formData.append("image", image);


    try {
      const response = await axios.post(
        "https://localhost:7167/api/Championship/CreateChampionship",
        formData
      );
      const message = response.data as String;
      setErrorCreate(message.toString());
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
      <select onChange={(e) => setRegion(e.target.value)}>
        {regions.map((region) => (
          <option>{region.name}</option>
        ))}
      </select>
      {errorCreate}
      <button onClick={FetchCreateChampionship}>{buttonState}</button>
    </>
  );
}
