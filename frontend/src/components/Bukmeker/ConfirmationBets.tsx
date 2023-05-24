import { useState } from "react";
import { IBet } from "../../entity/Bet";
import { IBetValue } from "../../entity/BetValue";

interface Props {
    bets: IBet[]
}

export function ConfirmationBets({ bets }: Props) {
    //console.log(bets);
    return (<div style={{ margin: "10px" }}>
        {bets.map((bet) => (
            <div key={bet.id} style={{ display:"flex", justifyContent:"center", fontSize:"18px"}}>
                <Bet bet={bet} />
            </div>
        ))}
    </div>)
}

interface BetProps {
    bet: IBet
}
function Bet({ bet }: BetProps) {

    function editBet(index: number) {
        if (bet.values.length < 1)
            return;

        for (var i = 0; i < bet.values.length; i++) {
            if (i == index)
                bet.values[i].isConfirm = true;
            else
                bet.values[i].isConfirm = false;
        }
        //console.log(bet.values)
    }

    for (var i = 0; i < bet.values.length; i++) {
        if (i == 0)
            bet.values[i].isConfirm = true;
        else
            bet.values[i].isConfirm = false;
    }
    //console.log(bet.values)
    return (
        <div style={{textAlign:"center", marginTop:"15px"}}>
            <p>{bet.name}</p>
            <BetValues betValues={bet.values} editBet={editBet} />
        </div>
    )
}

interface BetValuesProps {
    betValues: IBetValue[],
    editBet: (index: number) => void
}

function BetValues({ betValues, editBet }: BetValuesProps) {

    return (<div>
        <select style={{borderRadius:"3px"}} onChange={e => editBet(Number(e.target.value))}>
            {betValues.map((bet, index) => (
                <option style={{borderRadius:"3px"}} key={index} value={index}>{bet.name}:{" "}{bet.value}</option>
            ))}
        </select>
    </div>)
}