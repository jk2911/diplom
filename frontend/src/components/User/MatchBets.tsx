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
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "30px"}}>
                <div style={{ textAlign: "center", fontSize: "20px", marginBottom:"5px" }}>{bet.name}</div>
                <div>
                    <BetValues betValue={bet.values} name={bet.name} setBet={setBet} />
                </div>
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
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            {betValue.map((b) => (
                <Value bet={b} name={name} setBet={setBet} />
            ))}
        </div>)
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

    return (<div style={{ top: 0, left: 0, width: "100%", height: "100%", marginLeft: "5px" }}>
        <button onClick={setNewBet} style={{ textAlign: "center", width: "100%", height: "100%", borderRadius: "3px", fontSize: "17px" }}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <div>
                    {bet.name}</div><div>{bet.value}
                </div>
            </div>
        </button>
    </div>)
}
