import { useSearchParams } from "react-router-dom";
import { useMatch } from "../../hooks/match";
import styled from "styled-components";
import { ConfirmationBets } from "../../components/Bukmeker/ConfirmationBets";
import { NormalDate } from "../../components/Main/upcoming matches sorted by regions";
import image from "../../assets/club.png"
import { IMatch } from "../../entity/Match";
import { Row } from "react-bootstrap";
import { useState } from "react";
import axios, { AxiosError } from "axios";

export function ConfirmationBetsPage() {
    const [saveButton, setSaveButton] = useState("Сохранить");
    const [params, setParams] = useSearchParams();

    const id = params.get("id");

    const { match, error, loading } = useMatch(Number(id));

    return (<Container>
        <Content>
            {loading && <div>Загрузка</div>}
            {match && (
                <>{Match(match, setSaveButton, saveButton)}</>)}
        </Content>
    </Container>)
}



function Match(match: IMatch, setSaveButton: any, saveButton: string) {

    match.dateTime = new Date(match.dateTime);

    async function SaveBets() {
        setSaveButton("Сохранение...");
        try {
            const response = await axios.put(
                "https://localhost:7167/api/Bet/SaveConfirmBets",
                match
            );
            const message = response.data as String;
        } catch (e: unknown) {
            const error = e as AxiosError;
            const message = error.response?.data as String;
        }
        setSaveButton("Сохранить");
    }

    return (
        <div >
            <Row>{NormalDate(match.dateTime.getDate())}.{NormalDate(match.dateTime.getMonth())}{" "}
                {NormalDate(match.dateTime.getHours())}:{NormalDate(match.dateTime.getMinutes())}
                <img
                    src={match.home.image != null ? match.home.image : image}
                    style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
                />{" "}
                {match.home.name}{" "}
                {match.away.name}
                <img
                    src={match.away.image != null ? match.away.image : image}
                    style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
                />
                <button style={{ width: "150px" }} onClick={SaveBets}>{saveButton}</button>
            </Row>
            <Row>
                <div>
                    <>Голы</>
                    <div>{match.homeGoal} {" "}{match.awayGoal}</div>
                </div>
                <div>
                    <>Угловые</>
                    <div>{match.cornerHome} {" "}{match.cornerAway}</div>
                </div>
                <div>
                    <>Удары</>
                    <div>{match.shotsHome} {" "}{match.shotsAway}</div>
                </div>
                <div>
                    <>Удары в створ</>
                    <div>{match.shotsInTargetHome} {" "}{match.shotsInTargetAway}</div>
                </div>
                <div>
                    <>Сэйвы</>
                    <div>{match.saveHome} {" "}{match.saveAway}</div>
                </div>
                <div>
                    <>Владение</>
                    <div>{match.possession} {" "}{100 - match.possession}</div>
                </div>
                <div>
                    <>Фолы</>
                    <div>{match.foulsHome} {" "}{match.foulsAway}</div>
                </div>
                <div>
                    <>Оффсайды</>
                    <div>{match.offsideHome} {" "}{match.offsideAway}</div>
                </div>
                <div>
                    <>Желтые карточки</>
                    <div>{match.yellowCardHome} {" "}{match.yellowCardHome}</div>
                </div>
                <div>
                    <>Красные карточки</>
                    <div>{match.redCardHome} {" "}{match.redCardAway}</div>
                </div>
            </Row>
            <Row>
                <ConfirmationBets bets={match.bets} />
            </Row>
        </div>
    )
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