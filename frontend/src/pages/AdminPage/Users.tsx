import { Row } from "react-bootstrap";
import { useUsers } from "../../hooks/user";
import styled from "styled-components";
import { useState } from "react";
import { Modal } from "../../modal/Modal";
import { ChangeRole } from "../../components/Admin/User/ChangeRole";
import { IUser } from "../../entity/User";

export function AllUsers() {
  const { users, error, loading } = useUsers();
  const [roleModal, setRoleModal] = useState(false);
  const [userChange, setUserchange] = useState<IUser>({
    id: 0,
    email: "",
    token: "",
    role: '',
    money: 0
  });

  function Change(user: IUser) {
    setUserchange(user);
    setRoleModal(true)
  }

  return <div>
    {loading && <Div>Загрузка</Div>}
    {users.map((user) => (
      <div key={user.id}>
        <RowItem key={user.id}>
          <div style={{width:"5%"}}>{user.id}</div>
           <div style={{width:"40%"}}>{user.email}</div> 
           <div style={{width:"20%"}}>
            {user.role=="admin" &&<>Администратор</>}
            {user.role=="user" &&<>Пользователь</>}
            {user.role=="bukmeker" &&<>Букмекер</>}
            </div> 
           <button style={{ width: "200px", marginLeft: "20px",borderRadius:"3px" }} onClick={() => Change(user)}>Изменить роль</button>
        </RowItem>
      </div>
    ))}
    <Modal active={roleModal} setActive={setRoleModal}>
      <ChangeRole user={userChange} />
    </Modal>
  </div>;
}

const RowItem = styled(Row)`
  margin-left: 5px;
  margin-top: 5px;
  padding: 5px;
  background-color: #eee;
  color: #333;
  border: 1px #ccc solid;
  cursor: pointer;
  list-style: none;
  border-radius: 3px;
`;

const Div = styled.div`
  margin-bottom: 15px;
`;