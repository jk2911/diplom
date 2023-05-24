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
    {loading && <>Загрузка</>}
    {users.map((user) => (
      <div>
        <RowItem key={user.id}>
          {user.id} {user.email} {user.role} <button style={{ width: "200px", marginLeft:"20px" }} onClick={() => Change(user)}>Изменить роль</button>
        </RowItem>
      </div>
    ))}
    <Modal active={roleModal} setActive={setRoleModal}>
      <ChangeRole user={userChange} />
    </Modal>
  </div>;
}

const RowItem = styled(Row)`
  padding: 5px;
  background-color: #eee;
  color: #333;
  border: 1px #ccc solid;
  cursor: pointer;
  list-style: none;
`;