import { useUserBets } from "../../hooks/bet"
import { IUserBet } from "../../entity/UserBets";
import styled from "styled-components";

interface Props {
    id: number
}

export function UserBets({ id }: Props) {
    const { bets, loading, error } = useUserBets(id);
    return <div>
        <BetItem>
            <div style={{ width: "50%" }}>Матч</div>
            <div style={{ width: "15%" }}>Ставка</div>
            <div style={{ width: "10%" }}>Сумма(BYN)</div>
            <div style={{ width: "25%" }}>Статус</div>
        </BetItem>
        {loading && <>Загрузка</>}
        {bets.map((b) => (
            <Bet b={b} key={b.id} />
        ))}
    </div>
}

interface BetProps {
    b: IUserBet
}

function Bet({ b }: BetProps) {
    return (
        <BetItem>
            <div style={{ width: "50%" }}>{b.match}</div>
            <div style={{ width: "15%" }}>
                {b.betValue.name}{"   "}{"   "}{b.betValue.value}
                </div>
            <div style={{ width: "10%" }}>{b.money}</div>
            <div style={{ width: "25%" }}>
                {b.isWin == null && <>Играется</>}{" "}
                {b.isWin == true && <>Выиграна</>}{" "}
                {b.isWin == false && <>Проиграна</>}{" "}</div>
        </BetItem>)
}

const BetItem = styled.div`
    font-size: 18px;
    display: flex;
    justify-content: center;
`