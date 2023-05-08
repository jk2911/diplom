import { Row } from "react-bootstrap";
import { useTeams } from "../../hooks/team";

export function AllTeams(){
    const {teams, loading, error} = useTeams();
    return <>
    {error && <>Ошибка</>}
    {loading && <>Загрузка</>}
    {teams.map((team)=>(
        <Row key={team.id}>
            {team.id} {team.name} {team.region.name} 
        </Row>
    ))}
    </>
}