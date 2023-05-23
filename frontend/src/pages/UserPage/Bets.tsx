import { useEffect } from "react";
import { useUserBets } from "../../hooks/bet"
import { IUserBet } from "../../entity/UserBets";

interface Props {
    id: number
}

export function UserBets({ id }: Props) {
    const { bets, loading, error } = useUserBets(id);

    // useEffect(()=>(
    //     console.log(bets)
    // ),[])
    return <div>
        {loading && <>Загрузка</>}
        {bets.map((b) => (
            <Bet b={b} key={b.id}/>
        ))}
    </div>
}

interface BetProps {
    b: IUserBet
}

function Bet({ b }: BetProps) {
    console.log(b.id, b.isWin)  
    return (<div>
        {b.betValue.name} {" "} {b.money}{" "} {b.isWin == null && <>Играется</>}{" "}
        {b.isWin == true && <>Выиграна</>}{" "}
        {b.isWin == false && <>Проиграна</>}{" "}
    </div>)
}