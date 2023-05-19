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
        <div>
            {NormalDate(h.date.getDate())}{" "}{NormalDate(h.date.getMonth())}{" "}{h.status}{" "}{" "}{h.money}
        </div>)
}