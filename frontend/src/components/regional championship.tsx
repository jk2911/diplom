import { Row } from "react-bootstrap";
import { IChampionship } from "../entity/Championship";

interface ChampionshipProps {
  championship: IChampionship;
}

export function RegionalChampionship({ championship }: ChampionshipProps) {
  return <Row>{championship.name}</Row>;
}
