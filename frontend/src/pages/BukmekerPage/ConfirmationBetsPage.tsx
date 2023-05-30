import { useSearchParams } from "react-router-dom";
import { useMatch } from "../../hooks/match";
import styled from "styled-components";
import { ConfirmationBets } from "../../components/Bukmeker/ConfirmationBets";
import { NormalDate } from "../../components/Main/UpcomingMatchesSorted";
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
            <div style={{ fontSize: "18px", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "25%" }}></div>
                <div style={{ width: "55%" }}>
                    <img
                        src={match.home.image != null ? match.home.image : image}
                        style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
                    />{" "}
                    {match.home.name}{" "}
                    {NormalDate(match.dateTime.getDate())}.{NormalDate(match.dateTime.getMonth())}{" | "}
                    {NormalDate(match.dateTime.getHours())}:{NormalDate(match.dateTime.getMinutes())}{" "}
                    {match.away.name}
                    <img
                        src={match.away.image != null ? match.away.image : image}
                        style={{ minHeight: 10, maxHeight: 70, minWidth: 10, maxWidth: 70 }}
                    />
                </div>
                <div style={{ width: "20%" }}>
                    <button style={{ width: "150px", borderRadius:"3px" }} onClick={SaveBets}>{saveButton}</button>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "20px", fontSize: "18px" }}>
                    <div>
                        <NameSt>Голы</NameSt>
                        <NameSt>{match.homeGoal} {" "}{match.awayGoal}</NameSt>
                    </div>
                    <div>
                        <NameSt>Угловые</NameSt>
                        <NameSt>{match.cornerHome} {" "}{match.cornerAway}</NameSt>
                    </div>
                    <div>
                        <NameSt>Удары</NameSt>
                        <NameSt>{match.shotsHome} {" "}{match.shotsAway}</NameSt>
                    </div>
                    <div>
                        <NameSt>Удары в створ</NameSt>
                        <NameSt>{match.shotsInTargetHome} {" "}{match.shotsInTargetAway}</NameSt>
                    </div>
                    <div>
                        <NameSt>Сэйвы</NameSt>
                        <NameSt>{match.saveHome} {" "}{match.saveAway}</NameSt>
                    </div>
                    <div>
                        <NameSt>Владение</NameSt>
                        <NameSt>{match.possession} {" "}{100 - match.possession}</NameSt>
                    </div>
                    <div>
                        <NameSt>Фолы</NameSt>
                        <NameSt>{match.foulsHome} {" "}{match.foulsAway}</NameSt>
                    </div>
                    <div>
                        <NameSt>Оффсайды</NameSt>
                        <NameSt>{match.offsideHome} {" "}{match.offsideAway}</NameSt>
                    </div>
                    <div>
                        <NameSt>Желтые карточки</NameSt>
                        <NameSt>{match.yellowCardHome} {" "}{match.yellowCardHome}</NameSt>
                    </div>
                    <div>
                        <NameSt>Красные карточки</NameSt>
                        <NameSt>{match.redCardHome} {" "}{match.redCardAway}</NameSt>
                    </div>
                </div>
                <div style={{ width: "50%" }}>
                    <ConfirmationBets bets={match.bets} />
                </div></div>
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

const NameSt = styled.div`
    text-align: center;
`