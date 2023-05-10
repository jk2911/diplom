import { Row } from "react-bootstrap";
import { useAllRegions } from "../../hooks/region";
import { useAllChampionships } from "../../hooks/championship";
import styled from "styled-components";
import { IChampionship } from "../../entity/Championship";
import { useState, useEffect } from "react";
import { Modal } from "../../modal/Modal";
import { CreateChampionship } from "../../components/Admin/CreateChampionship";

export function AllChampionships() {
  const { championships, error, loading } = useAllChampionships();
  const [sortChampionshipsList, setSortChampionships] = useState(championships);
  const [createModalActive, setCreateModalActive] = useState(false);

  useEffect(() => {
    setSortChampionships(championships);
  }, [championships]);

  function sortRegions(value: string) {
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
  return (
    <>
      <Modal active={createModalActive} setActive={setCreateModalActive}>
        <CreateChampionship />
      </Modal>
      <select onChange={(e) => sortRegions(e.target.value)}>
        <option value="1">id</option>
        <option value="2">названию</option>
        <option value="3">региону</option>
      </select>
      <button onClick={() => setCreateModalActive(true)}>
        Создать чемпионат
      </button>
      {loading && <>Загрузка епта</>}
      {sortChampionshipsList.map((ch) => (
        <RowItem key={ch.id}>
          {ch.id} {ch.name} {ch.region.name}
        </RowItem>
      ))}
    </>
  );
}

const RowItem = styled(Row)`
  padding: 5px;
  background-color: #eee;
  color: #333;
  border: 1px #ccc solid;
  cursor: pointer;
  list-style: none;
`;
