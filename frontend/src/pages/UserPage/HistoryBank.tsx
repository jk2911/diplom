import styled from "styled-components";
import { NormalDate } from "../../components/Main/upcoming matches sorted by regions";
import { IHistoryUser } from "../../entity/HistoryUser";
import { useHistoryUser } from "../../hooks/user"

interface Props {
    id: number
}

export function HistoryUser({ id }: Props) {
    const { history, loading, error } = useHistoryUser(id);

    // useEffect(()=>(
    //     console.log(bets)
    // ),[])
    return <div>
        {loading && <>Загрузка</>}
        {/* {history.map((h)=>(<>{h.id}</>))} */}
        {history.map((h) => (
            <div>
                <History h={h} />
            </div>
        ))}
        {/* {bets.map((b) => (
            <div>
                {b.betValue.name} {" "} {b.money}
            </div>
        ))} */}
    </div>
}

interface HisProps {
    h: IHistoryUser
}

function History({ h }: HisProps) {
    h.date = new Date(h.date);
    return (
        <HistoryItem>
            {NormalDate(h.date.getDate())}{"."}{NormalDate(h.date.getMonth() + 1)}{"."}
            {NormalDate(h.date.getFullYear())}{" "}
            {NormalDate(h.date.getHours())}{":"}{NormalDate(h.date.getMinutes())}{" "}
            {h.status}{" "}{" "}{h.money} BYN
        </HistoryItem>)
}

const HistoryItem = styled.div`
    font-size: 20px;
`