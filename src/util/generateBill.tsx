export default function generateBill(basket: Basket): Bill {
  let subtotal: number = 0;
  let groceries: LineItem<Grocery>[] = [];
  let discounts: LineItem<Discount>[] = [];

  Object.keys(basket).forEach(key => {
    const quantity = basket[key as Grocery]!;
    groceries.push({ id: key as Grocery, quantity });
    subtotal += calculateItemSubtotal(key, quantity);

    const discount = calculateDiscounts(key, basket);
    if (discount !== null) {
      discounts.push(discount);
    }
  });

  const discountTotal = calculateDiscountToal(discounts);

  return {
    subtotal,
    groceries,
    discountTotal,
    total: subtotal - discountTotal,
    discounts,
  };
}

function calculateItemSubtotal(key: string, quantity: number) {
  return PriceList[key as Grocery] * quantity;
}

function calculateDiscounts(key: string, basket: Basket): LineItem<Discount> | null {
  const count = basket[key as Grocery]!;
  switch (key as Grocery) {
    case "Butter": {
      if (count > 0) {
        return {
          id: "33% Off Butter",
          quantity: count,
        };
      }
      break;
    }
    case "Cheese": {
      if (count > 1) {
        return {
          id: "Buy One Get One Free on Cheese",
          quantity: Math.floor(count / 2),
        };
      }

      break;
    }
    case "Soup": {
      if (count > 0 && basket["Bread"] && basket["Bread"] > 0) {
        return {
          id: "Half Price Bread With Soup",
          quantity: Math.min(count, basket["Bread"]),
        };
      }
      break;
    }
  }
  return null;
}

function calculateDiscountToal(discounts: LineItem<Discount>[]): number {
  return discounts.reduce((curr, val) => {
    switch (val.id) {
      case "33% Off Butter": {
        return curr + val.quantity * (PriceList["Butter"] / 3);
      }
      case "Buy One Get One Free on Cheese": {
        return curr + val.quantity * PriceList["Cheese"];
      }
      case "Half Price Bread With Soup": {
        return curr + val.quantity * (PriceList["Bread"] / 2);
      }
      default:
        return curr;
    }
  }, 0);
}

export type Basket = {
  [key in Grocery]?: number;
};

export type Bill = {
  groceries: LineItem<Grocery>[];
  discounts: LineItem<Discount>[];
  discountTotal: number;
  subtotal: number;
  total: number;
};

export type LineItem<T extends string> = {
  id: T;
  quantity: number;
};

export type Discount =
  | "Buy One Get One Free on Cheese"
  | "Half Price Bread With Soup"
  | "33% Off Butter";

export type Grocery = "Bread" | "Butter" | "Cheese" | "Milk" | "Soup";

export const PriceList: { [key in Grocery]: number } = {
  Bread: 110,
  Butter: 120,
  Cheese: 90,
  Milk: 50,
  Soup: 60,
};
