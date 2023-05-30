import styled from "styled-components";
import { NormalDate } from "../../components/Main/UpcomingMatchesSorted";
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
        <HistoryItem>
            <div style={{ width: "20%" }}>
                Время
            </div>
            <div style={{ width: "70%" }}>Операция</div>
            <div style={{ width: "10%" }}>
                Сумма(BYN)
            </div>
        </HistoryItem>
        {loading && <>Загрузка</>}
        {/* {history.map((h)=>(<>{h.id}</>))} */}
        {history.map((h) => (
            <div>
                <History h={h} />
            </div>
        ))}
    </div>
}

interface HisProps {
    h: IHistoryUser
}

function History({ h }: HisProps) {
    h.date = new Date(h.date);
    return (
        <HistoryItem>
            <div style={{ width: "20%" }}>
                {NormalDate(h.date.getDate())}{"."}{NormalDate(h.date.getMonth() + 1)}{"."}
                {NormalDate(h.date.getFullYear())}{" "}
                {NormalDate(h.date.getHours())}{":"}{NormalDate(h.date.getMinutes())}
            </div>
            <div style={{ width: "70%" }}>{h.status}</div>
            <div style={{ width: "10%" }}>
                {h.money} BYN
            </div>
        </HistoryItem>)
}

const HistoryItem = styled.div`
    font-size: 18px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`