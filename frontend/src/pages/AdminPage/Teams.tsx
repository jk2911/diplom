import { Row } from "react-bootstrap";
import { useTeams } from "../../hooks/team";
import styled from "styled-components";
import { useState } from "react";
import { CreateTeam } from "../../components/Admin/CreateTeam";
import { Modal } from "../../modal/Modal";

export function AllTeams() {
  const { teams, loading, error } = useTeams();
  const [createModalActive, setCreateModalActive] = useState(false);

  const toTeam = (id: number) => {
    window.location.assign("/admin/team?id=" + id);
  };

  return (
    <>
      <Modal active={createModalActive} setActive={setCreateModalActive}>
        <CreateTeam />
      </Modal>
      {/* <select onChange={(e) => sortRegions(e.target.value)}>
        <option value="1">id</option>
        <option value="2">названию</option>
        <option value="3">региону</option>
      </select> */}
      <button onClick={() => setCreateModalActive(true)}>
        Создать команду
      </button>
      {error && <>Ошибка</>}
      {loading && <>Загрузка</>}
      {teams.map((team) => (
        <RowItem key={team.id} onClick={() => toTeam(team.id)}>
          <img
            src={team.image}
            style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
          />
          {team.id} {team.name} {team.region.name}
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
