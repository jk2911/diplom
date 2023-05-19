import { useEffect } from "react";
import { useUserBets } from "../../hooks/bet"

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
        {bets.map((b)=>(
            <div>
                {b.betValue.name} {" "} {b.money}
            </div>
        ))}
    </div>
}