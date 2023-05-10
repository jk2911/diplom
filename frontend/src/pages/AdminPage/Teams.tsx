import { Row } from "react-bootstrap";
import { useTeams } from "../../hooks/team";
import styled from "styled-components";

export function AllTeams(){
    const {teams, loading, error} = useTeams();
    return <>
    {error && <>Ошибка</>}
    {loading && <>Загрузка</>}
    {teams.map((team)=>(
        <RowItem key={team.id}>
            <img src={team.image} style={{minHeight:10, maxHeight:70, minWidth:10, maxWidth:70}}/>
            {team.id} {team.name} {team.region.name} 
        </RowItem>
    ))}
    </>
}

const RowItem = styled(Row)`
  padding: 5px;
  background-color: #eee;
  color: #333;
  border: 1px #ccc solid;
  cursor: pointer;
  list-style: none;
`;