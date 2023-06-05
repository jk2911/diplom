import axios, { AxiosError } from "axios";
import { useState } from "react";
import styled from "styled-components";

export function CreateRegion() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [buttonState, setButton] = useState("Создать");
  const [errorCreate, setErrorCreate] = useState("");

  const FetchCreateRegion = async (event: any) => {
    //event.preventDefault();
    event.stopPropagation();
    setButton("Создание");

    const formData = new FormData();
    formData.append("name", name);

    if (image != null) formData.append("image", image);

    try {
      const response = await axios.post(
        "https://localhost:7167/api/Region/CreateRegion",
        formData
      );
      const message = response.data as String;
      //setErrorCreate(message.toString());
      window.location.assign("/admin/regions");
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
    <FormContainer>
      <div style={{ marginTop: "7px", marginBottom: "15px" }}>
        Создание региона
      </div>
      <div style={{ marginBottom: "15px" }}>
        <input
          value={name}
          placeholder="Название"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="file"
          accept="image/*,.png,.jpg,.gif,.web"
          onChange={AddImage}
        />
      </div>
      <div style={{ color: "red" }}>{errorCreate}</div>
      <StyledButton onClick={FetchCreateRegion}>{buttonState}</StyledButton>
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
