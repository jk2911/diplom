import { Row } from "react-bootstrap";
import { useUsers } from "../../hooks/user";

export function AllUsers() {
  const { users, error, loading } = useUsers();

  return <>
    {loading && <>Загрузка</>}
    {users.map((user)=>( 
        <Row key={user.id}>
            {user.id} {user.email} {user.role}
        </Row>
    ))}
  </>;
}
