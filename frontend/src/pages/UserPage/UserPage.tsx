import jwtDecode from "jwt-decode";
import styled from "styled-components";
import { useUser } from "../../hooks/user";
import { Link, Route, Routes } from "react-router-dom";
import { UserBets } from "./Bets";
import { HistoryUser } from "./HistoryBank";
import { useState } from "react";
import { Modal } from "../../modal/Modal";
import { AddMoney } from "../../components/User/AddMoney";
import { AddNewCard } from "../../components/User/AddNewCard";
import { Withdrawal } from "../../components/User/Withdrawal";

export function UserPage() {
    const [activeModal, setActiveModal] = useState(false);
    const [activeAddCard, setActiveAddCard] = useState(false);
    const [activeWithdrawal, setActiveWithdrawal] = useState(false);
    const [amount, setAmount] = useState(2);

    function AddNewCardModal(active: boolean) {
        setActiveModal(false);
        setActiveAddCard(true);
    }

    const token = localStorage.getItem("token");

    if (token == undefined || token == null)
        window.location.assign("/");

    const userTemp: any = jwtDecode(token ? token : "");

    if (userTemp.email == null)
        window.location.assign("/");

    const { user, loading, error } = useUser(userTemp.email)


    return (<Container>
        <Content>
            {loading && <>Загрузка</>}
            {user && (
                <div>
                    <Modal active={activeModal} setActive={setActiveModal}>
                        <AddMoney id={user.id} setActiveAddCard={AddNewCardModal} amount={amount} setAmount={setAmount} />
                    </Modal>
                    <Modal active={activeAddCard} setActive={setActiveAddCard}>
                        <AddNewCard id={user.id} amount={amount} />
                    </Modal>
                    <Modal active={activeWithdrawal} setActive={setActiveWithdrawal}>
                        <Withdrawal id={user.id} />
                    </Modal>
                    <div style={{display:"flex", justifyContent:"flex-start", fontSize:"20px"}}>
                        <div style={{marginLeft:"15px", marginRight:"15px"}}>Пользователь: {user.email}</div>
                        <div style={{marginRight:"15px"}}>
                            <button style={{borderRadius:"3px"}}  onClick={() => setActiveModal(true)}>Пополнить счет</button>
                        </div>
                        <div>
                            <button style={{borderRadius:"3px"}} onClick={() => setActiveWithdrawal(true)}>Вывод средств</button>
                        </div>
                    </div>
                    <div>
                        <TabsContainer>
                            <TabElement>
                                <Link to="bets">Ставки</Link>
                            </TabElement>
                            <TabElement>
                                <Link to="history">История счета</Link>
                            </TabElement>
                        </TabsContainer>


                        <Routes>
                            <Route path="/bets" element={<UserBets id={user.id} />} />
                            <Route path="/history" element={<HistoryUser id={user.id} />} />
                        </Routes>
                    </div>
                </div>
            )}
        </Content>
    </Container>)
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

const TabsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 15px;
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