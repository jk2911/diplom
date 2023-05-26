import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAllRegions } from "../../hooks/region";
import styled from "styled-components";

export function CreateTeam() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [buttonState, setButton] = useState("Создать");
  const [errorCreate, setErrorCreate] = useState("");
  const [region, setRegion] = useState("Испания");
  const { regions, error, loading } = useAllRegions();

  useEffect(() => {
    setRegion(regions == null || regions.length < 1 ? "Мир" : regions[0].name);
  }, [regions]);

  const FetchCreateTeam = async (event: any) => {
    //event.preventDefault();
    event.stopPropagation();
    setButton("Создание");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("region", region);

    if (image != null) formData.append("image", image);

    try {
      const response = await axios.post(
        "https://localhost:7167/api/Team/CreateTeam",
        formData
      );
      // const message = response.data as String;
      // setErrorCreate(message.toString());
      window.location.assign("/admin/teams")
    } catch (e: unknown) {
      const error = e as AxiosError;
      const message = error.response?.data as String;
      setErrorCreate(message.toString());
    }
    setButton("Создать");
  };

  const AddImage = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <FormContainer>
      <Div>Создание команды</Div>
      <Div>
        <input value={name} placeholder="Название" onChange={(e) => setName(e.target.value)} />
      </Div>
      <Div>
        <input
          type="file"
          accept="image/*,.png,.jpg,.gif,.web"
          onChange={AddImage}
        />
      </Div>
      <Div>
        <select onChange={(e) => setRegion(e.target.value)}>
          {regions.map((region) => (
            <option>{region.name}</option>
          ))}
        </select>
      </Div>
      <Div>{errorCreate}</Div>
      <StyledButton onClick={FetchCreateTeam}>{buttonState}</StyledButton>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 25vw;
`;

const StyledButton = styled.button`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 56px;
  padding-left: 60px;
  padding-right: 60px;
  font-size: 18px;
  font-family: "Montserrat-Bold";
  text-align: center;
  border: none;
  :hover {
    cursor: pointer;
  }
  transition-duration: 0.4s;
`;

const Div = styled.div`
  margin-bottom: 15px;
`;
