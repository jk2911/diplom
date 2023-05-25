import styled from "styled-components";
import { useAllChampionships } from "../../hooks/championship";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function BukmekerPage() {
  const { championships, error, loading } = useAllChampionships();
  const [sortChampionhsipList, setSortChampionship] = useState(championships);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSortChampionship(championships);
  }, [championships]);

  const Search = (e: React.ChangeEvent<HTMLInputElement>) => {
    //e.preventDefault();
    var text = e.target.value;
    console.log(text);

    setSearch(text);
    console.log(text !== "");
    if (text !== "") {
      setSortChampionship(
        championships.filter(
          (n) => n.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
        )
      );
    } else {
      setSortChampionship(championships);
    }
  };

  function toChampionship(id: number) {
    navigate("/bukmeker/championship/calendar?id=" + id);
  }

  return (
    <Container>
      <Content>
        <input
          value={search}
          onChange={(e) => Search(e)}
          style={{ marginRight: "20px", borderRadius: "3px" }}
          placeholder="Поиск чемпионата"
        />
        {loading && <>Загрузка</>}
        {sortChampionhsipList.map((ch) => (
          <RowItem key={ch.id} onClick={() => toChampionship(ch.id)}>
            <img
              src={ch.image}
              style={{
                minHeight: 10,
                maxHeight: 70,
                minWidth: 10,
                maxWidth: 70,
              }}
            />
            {ch.name} {ch.region.name}
          </RowItem>
        ))}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: start;
  overflow: scroll;
  overflow-x: hidden;
  width: 100vw;
  height: 100%;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  /* background-color: rgba(127, 255, 0, 0.9); */
  background-image: url("https://s1.1zoom.ru/big3/335/Footbal_Men_Ball_Legs_493200.jpg");
`;

const Content = styled.div`
  display: inline-block;
  margin-top: 60px;
  padding: 20px;
  border-radius: 16px;
  width: 80vw;
  /* height: 850px; */
  background-color: whitesmoke;
`;

const RowItem = styled(Row)`
  margin-top: 5px;
  padding: 5px;
  background-color: #eee;
  color: #333;
  border: 1px #ccc solid;
  cursor: pointer;
  list-style: none;
  border-radius: 5px;
`;

const TabElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  padding: 9px 20px;
  font-size: 18px;
  /* box-shadow: 2px 5px 25px -3px ${(props) => props.theme.textShadow}; */
  border-radius: 10px;
  /* background-color: ${(props) => props.theme.tabsBackColor};
  color: ${(props) => props.theme.paginationButtonColor}; */
  cursor: pointer;
`;
