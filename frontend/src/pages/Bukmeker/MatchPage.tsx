import { useSearchParams } from "react-router-dom";
import { useMatch } from "../../hooks/match";
import styled from "styled-components";
import image from "../../assets/club.png"
import { IBetValue } from "../../entity/BetValue";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { AddBet } from "../../components/Admin/Match/AddBet";
import { BetsValue } from "../../components/Admin/Match/Bets";
import { IBet } from "../../entity/Bet";
import { Modal } from "../../modal/Modal";
import { BukmekerAddBet } from "../../components/Bukmeker/AddBet";

const newBetValue: IBetValue = {
    id: 0,
    name: "",
    value: 1,
    betId: 1,
};

export function BukmekerMatchPage() {
    const [addBet, setAddBet] = useState(false);

    const [params, setParams] = useSearchParams();

    const [bets, setBets] = useState<IBet[]>([]);

    const id = params.get("id");

    const { match, error, loading } = useMatch(Number(id));

    function save() {
        console.log(match?.bets);
    }

    useEffect(() => {
        if (!match) return;
        if (match.bets) setBets(match.bets);
    }, [match?.bets]);

    function RemoveBet(index: number) {
        console.log(index)
        // console.log(match?.bets)
        if (!match) return;
        if (match.bets) {
            const temp = match.bets.splice(index, 1)
            console.log(temp);
            setBets([...match.bets])
        };
    }


    async function Save() {
        try {
            const response = await axios.post(
                "https://localhost:7167/api/Match/EditMatch",
                // JSON.stringify(match)
                match
            );
            // const message = response.data as String;
            // setErrorCreate(message.toString());
        } catch (e: unknown) {
            const error = e as AxiosError;
            // console.log(error.message);
            // console.log(error.response?.data);
            const message = error.response?.data as String;
            console.log(message.toString());
            console.log(error.response?.data)
        }
    }

    return (
        <Container>
            <Content>
                {loading && <>Загрузка</>}
                {match && (
                    <div>
                        <Modal setActive={setAddBet} active={addBet}>
                            <BukmekerAddBet matchId={match.id} />
                        </Modal>
                        <div>
                            <img
                                src={match.home.image != null ? match.home.image : image}
                                style={{
                                    minHeight: 10,
                                    maxHeight: 70,
                                    minWidth: 10,
                                    maxWidth: 70,
                                }}
                            />{" "}
                            {match.home.name} {match.away.name}{" "}
                            <img
                                src={match.away.image != null ? match.away.image : image}
                                style={{
                                    minHeight: 10,
                                    maxHeight: 70,
                                    minWidth: 10,
                                    maxWidth: 70,
                                }}
                            />
                            <button onClick={Save}>Сохранить</button>
                        </div>

                        <div >
                            <div>

                                <button onClick={() => setAddBet(true)}>Добавить</button>
                                <BetsValue bets={bets} removeBet={RemoveBet} setBets={() => setBets} />
                            </div>

                        </div>
                    </div>
                )}
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