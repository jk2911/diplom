import styled from "styled-components";
import { IBet } from "../../entity/Bet";
import { IBetValue } from "../../entity/BetValue";
import jwt_decode from "jwt-decode";

interface Props {
    bets: IBet[],
    setBet: (bet: IBetValue) => void
}

export function MatchBets({ bets, setBet }: Props) {
    return (<div>
        {bets.map((bet) => (
            <div>
                <p>{bet.name}</p>
                <BetValues betValue={bet.values} name={bet.name} setBet={setBet} />
            </div>
        ))}
    </div>)
}

interface BetValuesProps {
    betValue: IBetValue[],
    name: string
    setBet: (bet: IBetValue) => void
}
function BetValues({ betValue, setBet, name }: BetValuesProps) {
    return (<BetValuesContainer>
        {betValue.map((b) => (
            <Value bet={b} name={name} setBet={setBet} />
        ))}
    </BetValuesContainer>)
}

interface ValueProps {
    bet: IBetValue,
    name: string
    setBet: (bet: IBetValue) => void
}

function Value({ bet, setBet, name }: ValueProps) {

    function setNewBet() {
        const token = localStorage.getItem("token");

        if (token == null)
            return;

        const user: any = jwt_decode(token);

        if (user.role != "user")
            return;


        const temp: IBetValue = {
            id: bet.id,
            name: name + ": " + bet.name,
            value: bet.value,
            betId: bet.betId
        }
        setBet(temp);
    }

    return (<div>
        <button onClick={setNewBet}>{bet.name}{"  "}{bet.value}</button>
    </div>)
}



const BetValuesContainer = styled.div`
    display:flex,
    justify-content:space-between
`