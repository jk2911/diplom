import { Row } from "react-bootstrap";
import { useAllRegions } from "../../hooks/region";
import { useAllChampionships } from "../../hooks/championship";
import styled from "styled-components";
import { IChampionship } from "../../entity/Championship";
import { useState, useEffect } from "react";
import { Modal } from "../../modal/Modal";
import { CreateChampionship } from "../../components/Admin/CreateChampionship";
import image from "../../assets/club.png"

export function AllChampionships() {
  const { championships, error, loading } = useAllChampionships();
  const [sortChampionshipsList, setSortChampionships] = useState(championships);
  const [createModalActive, setCreateModalActive] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSortChampionships(championships);
  }, [championships]);

  function sortChampionships(value: string) {
    if (championships == null) return;

    var buffer = championships;

    if (value == "1")
      buffer = [].slice
        .call(championships)
        .sort((r1: IChampionship, r2: IChampionship) =>
          r1.id > r2.id ? 1 : -1
        );

    if (value == "2")
      buffer = [].slice
        .call(championships)
        .sort((r1: IChampionship, r2: IChampionship) =>
          r1.name > r2.name ? 1 : -1
        );

    if (value == "3")
      buffer = [].slice
        .call(championships)
        .sort((r1: IChampionship, r2: IChampionship) =>
          r1.region.name > r2.region.name ? 1 : -1
        );

    setSortChampionships(buffer);
  }

  const Search = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    var text = e.target.value;

    setSearch(text);
    if (text !== "") {
      setSortChampionships(
        championships.filter(
          (n) => n.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
        )
      );
    } else {
      setSortChampionships(championships);
    }
  };

  const toChampionship = (id: number) => {
    window.location.assign("/admin/championship/teams?id=" + id);
  };

  return (
    <>
      <Modal active={createModalActive} setActive={setCreateModalActive}>
        <CreateChampionship />
      </Modal> 
      <input value={search} onChange={(e) => Search(e)} style={{ marginRight: "20px", borderRadius: "3px" }} placeholder="Поиск чемпионата"/>
      <select onChange={(e) => sortChampionships(e.target.value)}>
        <option value="1">id</option>
        <option value="2">названию</option>
        <option value="3">региону</option>
      </select>
      <button style={{ marginLeft: "20px", borderRadius:"3px" }} onClick={() => setCreateModalActive(true)}>
        Создать чемпионат
      </button>
      {loading && <>Загрузка епта</>}
      {sortChampionshipsList.map((ch) => (
        <RowItem key={ch.id} onClick={() => toChampionship(ch.id)}>
          <img
            src={ch.image != null ? ch.image : image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
          {ch.id} {ch.name} {ch.region.name}
        </RowItem>
      ))}
    </>
  );
}

const RowItem = styled(Row)`
margin-top: 5px;
  padding: 5px;
  background-color: #eee;
  color: #333;
  border: 1px #ccc solid;
  cursor: pointer;
  list-style: none;
  border-radius: 5px;
`;
