import { Row } from "react-bootstrap";
import { useAllRegions } from "../../hooks/region";
import styled from "styled-components";
import { useState, useEffect, FC } from "react";
import { useImmer } from "use-immer";
import { IRegion } from "../../entity/Region";
import { Modal } from "../../modal/Modal";
import { CreateRegion } from "../../components/Admin/CreateRegion";

export function AllRegions() {
  const { regions, error, loading } = useAllRegions();
  const [sortRegionsList, setSortRegions] = useState(regions);
  const [createModalActive, setCreateModalActive] = useState(false);

  useEffect(() => {
    setSortRegions(regions);
  }, [regions]);

  function sortRegions(value: string) {
    if (regions == null) return;

    var buffer = regions;

    if (value == "1")
      buffer = [].slice
        .call(regions)
        .sort((r1: IRegion, r2: IRegion) => (r1.id > r2.id ? 1 : -1));

    if (value == "2")
      buffer = [].slice
        .call(regions)
        .sort((r1: IRegion, r2: IRegion) => (r1.name > r2.name ? 1 : -1));

    setSortRegions(buffer);
  }

  const toRegion = (id: number) => {
    window.location.assign("/admin/region/championships?id=" + id);
  };

  return (
    <>
      <Modal active={createModalActive} setActive={setCreateModalActive}>
        <CreateRegion />
      </Modal>
      <select onChange={(e) => sortRegions(e.target.value)}>
        <option value="1">id</option>
        <option value="2">названию</option>
      </select>
      <button onClick={() => setCreateModalActive(true)}>Создать регион</button>
      {loading && <>Загрузка</>}
      {sortRegionsList.map((region) => (
        <RowItem key={region.id} onClick={() => toRegion(region.id)}>
          <img
            src={region.image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
          {region.id} {region.name}
        </RowItem>
      ))}
    </>
  );
}

{
  /* <details>
            <summary>{region.id} {region.name}</summary>
            <>
                {region.championships.map((ch)=>(
                    <Row>
                        {ch.id} {ch.name}
                    </Row>
                ))}
            </>
        </details> */
}

const RowItem = styled(Row)`
  padding: 5px;
  background-color: #eee;
  color: #333;
  border: 1px #ccc solid;
  cursor: pointer;
  list-style: none;
`;
