import { useState } from "react";
import { IBet } from "../../../entity/Bet";
import { IBetValue } from "../../../entity/BetValue";

interface Props {
  bets: IBet[];
  setBets: () => void;
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

export function BetsValue({ bets, setBets }: Props) {
  return (
    <div>
      {bets.map((bet) => (
        <Bet bet={bet} key={bet.id} />
      ))}
    </div>
  );
}

interface BetProps {
  bet: IBet;
}

export function Bet({ bet }: BetProps) {
  const [name, setName] = useState(bet.name);

  function SetName(e: any) {
    e.preventDefault();

    const nam = e.target.value;
    setName(nam);
    bet.name = nam;
  }
  function RemoveBet(){
    
  }

  return (
    <>
      <input type="text" value={name} onChange={(e) => SetName(e)} />
      {bet.values.map((bv) => (
        <div key={bv.id}>{BetValueInput(bv)}</div>
      ))}
      <button onClick={RemoveBet}></button>
    </>
  );
}

const BetValueInput = (bet: IBetValue) => {
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
    <>
      <input type="text" value={name} onChange={(e) => SetName(e)} />
      <input type="number" value={value} onChange={(e) => Set(e)} />
    </>
  );
};

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
