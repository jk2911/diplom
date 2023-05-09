import { Row } from "react-bootstrap";
import { useUsers } from "../../hooks/user";
import styled from "styled-components";

export function AllUsers() {
  const { users, error, loading } = useUsers();

  return <>
    {loading && <>Загрузка</>}
    {users.map((user)=>( 
        <RowItem key={user.id}>
            {user.id} {user.email} {user.role}
        </RowItem>
    ))}
  </>;
}

const RowItem = styled(Row)`
  padding: 5px;
  background-color: #eee;
  color: #333;
  border: 1px #ccc solid;
  cursor: pointer;
  list-style: none;
`;