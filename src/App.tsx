import React from "react";
import "./App.css";
import { Basket, Grocery } from "./util/generateBill";
import BillView from "./Components/Bill";
import Shopping from "./Components/Shopping";

function App() {
  const [showBill, setShowBill] = React.useState<boolean>(false);

  type Action = { type: "increment" | "decrement"; payload: Grocery };
  const reducer = (curr: Basket, action: Action): Basket => {
    switch (action.type) {
      case "decrement":
        return {
          ...curr,
          [action.payload]: Math.max(curr[action.payload]! - 1, 0),
        };
      case "increment":
        return {
          ...curr,
          [action.payload]: curr[action.payload]! + 1,
        };
      default:
        return curr;
    }
  };

  const [basket, dispatch] = React.useReducer(reducer, {
    Bread: 0,
    Butter: 0,
    Cheese: 0,
    Milk: 0,
    Soup: 0,
  });

  return (
    <div className="App">
      <header className="App-header">
        {showBill ? (
          <BillView basket={basket} goBack={() => setShowBill(false)} />
        ) : (
          <Shopping basket={basket} dispatch={dispatch} showBill={() => setShowBill(true)} />
        )}
      </header>
    </div>
  );
}

export default App;
