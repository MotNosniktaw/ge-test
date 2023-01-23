import React from "react";
import formatCurrency from "../util/formatCurrency";
import generateBill, { Basket, Discount, Grocery, LineItem, PriceList } from "../util/generateBill";

export default function BillView({ basket, goBack }: { goBack: () => void; basket: Basket }) {
  const bill = React.useMemo(() => generateBill(basket), [basket]);
  return (
    <div>
      <Items groceries={bill.groceries} subtotal={bill.subtotal} />
      {bill.discounts.length > 0 && (
        <Discounts discounts={bill.discounts} discountTotal={bill.discountTotal} />
      )}
      <Total total={bill.total} />
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

function Items(props: { groceries: LineItem<Grocery>[]; subtotal: number }): JSX.Element {
  return (
    <BillSectionContainer>
      <h3 style={{ textAlign: "left" }}>Items</h3>
      {props.groceries.map(g => (
        <div
          style={{ width: "100%", height: 50, display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: 200, textAlign: "left" }}>{g.id}</div>
          <div style={{ width: 100 }}>{formatCurrency(PriceList[g.id])}</div>
          <div style={{ width: 50 }}>{g.quantity}</div>
        </div>
      ))}
      <p style={{ textAlign: "right" }}>{formatCurrency(props.subtotal)}</p>
    </BillSectionContainer>
  );
}

function Discounts(props: { discounts: LineItem<Discount>[]; discountTotal: number }): JSX.Element {
  return (
    <BillSectionContainer>
      <h3 style={{ textAlign: "left" }}>Discounts</h3>
      {props.discounts.map(g => (
        <div
          style={{ width: "100%", height: 50, display: "flex", justifyContent: "space-between" }}
        >
          <p>{g.id}</p>
          <p>{g.quantity}</p>
        </div>
      ))}
      <p style={{ textAlign: "right" }}>-{formatCurrency(props.discountTotal)}</p>
    </BillSectionContainer>
  );
}
function Total(props: { total: number }): JSX.Element {
  return (
    <BillSectionContainer>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ textAlign: "left" }}>Total</h3>
        <p style={{ textAlign: "right" }}>{formatCurrency(props.total)}</p>
      </div>
    </BillSectionContainer>
  );
}

function BillSectionContainer(props: { children: React.ReactNode }) {
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
          padding: 12,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
