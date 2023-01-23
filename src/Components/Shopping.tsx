import { ReducerAction } from "react";
import { Basket, Grocery } from "../util/generateBill";

export default function Shopping(props: {
  basket: Basket;
  dispatch: React.Dispatch<{ type: "increment" | "decrement"; payload: Grocery }>;
  showBill: () => void;
}) {
  return (
    <div>
      <Input type="Bread" basket={props.basket} dispatch={props.dispatch} />
      <Input type="Butter" basket={props.basket} dispatch={props.dispatch} />
      <Input type="Cheese" basket={props.basket} dispatch={props.dispatch} />
      <Input type="Milk" basket={props.basket} dispatch={props.dispatch} />
      <Input type="Soup" basket={props.basket} dispatch={props.dispatch} />
      <button onClick={props.showBill}>Show Bill</button>
    </div>
  );
}

function Input(props: {
  dispatch: React.Dispatch<{ type: "increment" | "decrement"; payload: Grocery }>;
  basket: Basket;
  type: Grocery;
}): JSX.Element {
  return (
    <div
      style={{
        width: 500,
        padding: 12,
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 8,
          border: "1px solid #DDD",
          display: "flex",
          alignItems: "center",
          padding: 12,
        }}
      >
        <p>{props.type}</p>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: 100,
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={() =>
              props.dispatch({
                type: "decrement",
                payload: props.type,
              })
            }
          >
            -
          </div>
          <div>{props.basket[props.type]}</div>
          <div
            onClick={() =>
              props.dispatch({
                type: "increment",
                payload: props.type,
              })
            }
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
}
