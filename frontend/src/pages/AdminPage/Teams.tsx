import { Row } from "react-bootstrap";
import { useTeams } from "../../hooks/team";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { CreateTeam } from "../../components/Admin/CreateTeam";
import { Modal } from "../../modal/Modal";
import image from "../../assets/club.png"
import { ITeam } from "../../entity/Team";

export function AllTeams() {
  const { teams, loading, error } = useTeams();
  const [createModalActive, setCreateModalActive] = useState(false);
  const [sortTeamsList, setSortTeams] = useState(teams);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSortTeams(teams);
  }, [teams]);

  function sortRegions(value: string) {
    if (teams == null) return;

    var buffer = teams;

    if (value == "1")
      buffer = [].slice
        .call(teams)
        .sort((r1: ITeam, r2: ITeam) => (r1.region.name > r2.region.name ? 1 : -1));

    if (value == "2")
      buffer = [].slice
        .call(teams)
        .sort((r1: ITeam, r2: ITeam) => (r1.name > r2.name ? 1 : -1));

    setSortTeams(buffer);
  }

  const Search = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    var text = e.target.value;
    console.log(text);

    setSearch(text);
    if (text !== "") {
      setSortTeams(
        teams.filter(
          (n) => n.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
        )
      );
    } else {
      setSortTeams(teams);
    }
  };

  const toTeam = (id: number) => {
    window.location.assign("/admin/team/calendar?id=" + id);
  };

  return (
    <>
      <Modal active={createModalActive} setActive={setCreateModalActive}>
        <CreateTeam />
      </Modal>
      <input value={search} onChange={(e) => Search(e)} style={{ marginRight: "20px", borderRadius: "3px" }} placeholder="Поиск команды" />
      <select onChange={(e) => sortRegions(e.target.value)}>
        <option value="2">названию</option>
        <option value="1">региону</option>
      </select>
      <button style={{ marginLeft: "20px", borderRadius: "3px" }} onClick={() => setCreateModalActive(true)}>
        Создать команду
      </button>
      {error && <>Ошибка</>}
      {loading && <Div>Загрузка</Div>}
      {sortTeamsList.map((team) => (
        <RowItem key={team.id} onClick={() => toTeam(team.id)}>
          <div style={{ width: "7%" }}>
            <img
              src={team.image != null ? team.image : image}
              style={{ minHeight: 10, maxHeight: 60, minWidth: 10, maxWidth: 60 }}
            /></div>
          <div style={{ width: "7%" }}></div>
          <div style={{ width: "20%" }}> {team.name} </div>
          <div style={{ width: "20%" }}>{team.region.name}</div>
          <div style={{ width: "18%" }}></div>
        </RowItem>
      ))}
    </>
  );
}

const RowItem = styled(Row)`
display:flex;
justify-content:flex-start;
margin-top: 5px;
  padding: 5px;
  background-color: #eee;
  color: #333;
  border: 1px #ccc solid;
  cursor: pointer;
  list-style: none;
  border-radius: 5px;
`;

const Div = styled.div`
  margin-bottom: 15px;
`;
