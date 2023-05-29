import { useState } from "react";
import { IBet } from "../../../entity/Bet";
import { IBetValue } from "../../../entity/BetValue";
import styled from "styled-components";

interface Props {
  bets: IBet[];
  setBets: () => void;
  removeBet: (i: number) => void;
}

const newBet: IBet = {
  id: 0,
  name: "",
  matchId: 0,
  values: [],
};

const newBetValue: IBetValue = {
  id: 0,
  name: "",
  betId: 0,
  value: 1,
};

export function BetsValue({ bets, setBets, removeBet }: Props) {
  return (
    <div style={{ margin: "20px" }}>
      {bets.map((bet, index) => (
        <Bet bet={bet} key={bet.id} removeBet={removeBet} index={index} />
      ))}
    </div>
  );
}

interface BetProps {
  bet: IBet;
  removeBet: (i: number) => void;
  index: number
}

export function Bet({ bet, removeBet, index }: BetProps) {
  const [name, setName] = useState(bet.name);

  function SetName(e: any) {
    e.preventDefault();

    const nam = e.target.value;
    setName(nam);
    bet.name = nam;
  }

  var isChanged = true;

  if (name == "Исход" || name == "Двойной шанс" || name == "Тотал")
    isChanged = false;

  return (
    <div style={{ margin: "20px" }}>
      {isChanged ?
        <input style={{ margin: "5px" }} type="text" value={name} onChange={(e) => SetName(e)} /> :
        <div>{name}</div>
      }
      {bet.values.map((bv) => (
        <div key={bv.id}>{BetValueInput(bv, isChanged)}</div>
      ))}
    </div>
  );
}

const BetValueInput = (bet: IBetValue, isChanged: boolean) => {
  const [value, setValue] = useState(bet.value);
  const [name, setName] = useState(bet.name);

  function Set(e: any) {
    e.preventDefault();

    const num = Number(e.target.value);
    setValue(num);
    bet.value = num;
  }

  function SetName(e: any) {
    e.preventDefault();

    const nam = e.target.value;
    setName(nam);
    bet.name = nam;
  }

  return (
    <BetValueContainer>
      {isChanged ?
        <input style={{ margin: "5px" }} type="text" value={name} onChange={(e) => SetName(e)} /> :
        <div style={{width:"20px", textAlign:"center"}}>{name}</div>
      }
      <input style={{ margin: "5px", marginLeft:"100px" }} type="number" value={value} onChange={(e) => Set(e)} />
    </BetValueContainer>
  );
};

const BetValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`

// function AddBet() {
//   const RemoveValue = () => {
//     if (arrayValues.length == 1) return;
//     arrayValues.pop();
//     const a = 1;
//     const temp = arrayValues;
//     setArrayValues(temp);
//     console.log(arrayValues);
//   };
//   const [nameBet, setNameBet] = useState("");
//   const [arrayValues, setArrayValues] = useState([
//     <AddBetValue remove={RemoveValue} />,
//   ]);

//   const AddValue = () => {
//     setArrayValues(arrayValues.concat(<AddBetValue remove={RemoveValue} />));

//     // var temp = arrayValues;
//     // temp.push(arrayValues.length + 1);
//     // setArrayValues(temp);
//     // console.log(arrayValues);
//   };

//   function Add(){
//     arrayValues.forEach(t=>console.log(t.props.nameBet));
//   }

//   return (
//     <div>
//       Название
//       <input
//         type="text"
//         value={nameBet}
//         onChange={(e) => setNameBet(e.target.value)}
//       />
//       <button onClick={AddValue}>Добавить</button>
//       {arrayValues}
//       <button onClick={Add}>Добавить исход</button>
//     </div>
//   );
// }

// interface AddBetValueProps {
//   remove: () => void;
// }

// function AddBetValue({ remove }: AddBetValueProps) {
//   const [nameBet, setNameBet] = useState("");
//   const [valueBet, setValueBet] = useState(1);
//   return (
//     <div>
//       <div>
//         Название
//         <input
//           type="text"
//           value={nameBet}
//           onChange={(e) => setNameBet(e.target.value)}
//         />
//       </div>
//       <div>
//         Значение
//         <input
//           type="number"
//           value={valueBet}
//           onChange={(e) => setValueBet(Number(e.target.value))}
//         />
//       </div>
//       <button onClick={remove}>Удалить</button>
//     </div>
//   );
// }
