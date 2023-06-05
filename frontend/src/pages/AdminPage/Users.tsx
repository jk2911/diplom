import { Row } from "react-bootstrap";
import { useUsers } from "../../hooks/user";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Modal } from "../../modal/Modal";
import { ChangeRole } from "../../components/Admin/User/ChangeRole";
import { IUser } from "../../entity/User";

export function AllUsers() {
  const { users, error, loading } = useUsers();
  const [roleModal, setRoleModal] = useState(false);
  const [searchUsers, setSearchUsers] = useState(users);
  const [search, setSearch] = useState("");
  const [userChange, setUserchange] = useState<IUser>({
    id: 0,
    email: "",
    token: "",
    role: '',
    money: 0
  });

  useEffect(() => {
    setSearchUsers(users);
  }, [users]);

  function Change(user: IUser) {
    setUserchange(user);
    setRoleModal(true)
  }

  const Search = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    var text = e.target.value;

    setSearch(text);
    if (text !== "") {
      setSearchUsers(
        users.filter(
          (n) => n.email.toLowerCase().indexOf(text.toLowerCase()) !== -1
        )
      );
    } else {
      setSearchUsers(users);
    }
  };

  return <div>
    <input value={search} onChange={(e) => Search(e)} style={{ marginRight: "20px", borderRadius: "3px" }} placeholder="Поиск пользователя"/>
    {loading && <Div>Загрузка</Div>}
    {searchUsers.map((user) => (
      <div key={user.id}>
        <RowItem key={user.id}>
          <div style={{ width: "5%" }}>  </div>
          <div style={{ width: "40%" }}>{user.email}</div>
          <div style={{ width: "20%" }}>
            {user.role == "admin" && <>Администратор</>}
            {user.role == "user" && <>Пользователь</>}
            {user.role == "bukmeker" && <>Букмекер</>}
          </div>
          <button style={{ width: "200px", marginLeft: "20px", borderRadius: "3px" }} onClick={() => Change(user)}>Изменить роль</button>
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