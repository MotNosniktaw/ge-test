import generateBill from "../generateBill";

test("milk returns super simple bill", () => {
  const result = generateBill({
    Milk: 2,
  });

  expect(result.subtotal).toBe(100);
  expect(result.total).toBe(100);
  expect(result.discountTotal).toBe(0);
  expect(result.groceries).toHaveLength(1);
  expect(result.groceries[0].id).toBe("Milk");
  expect(result.groceries[0].quantity).toBe(2);
  expect(result.discounts).toHaveLength(0);
});

test("bread returns super simple bill", () => {
  const result = generateBill({
    Bread: 1,
  });

  expect(result.subtotal).toBe(110);
  expect(result.total).toBe(110);
  expect(result.groceries).toHaveLength(1);
  expect(result.groceries[0].id).toBe("Bread");
  expect(result.groceries[0].quantity).toBe(1);
  expect(result.discounts).toHaveLength(0);
});

test("milk and bread returns simple bill", () => {
  const result = generateBill({
    Bread: 1,
    Milk: 1,
  });

  expect(result.subtotal).toBe(160);
  expect(result.total).toBe(160);
  expect(result.groceries).toHaveLength(2);
  expect(result.discounts).toHaveLength(0);
});

test("cheese returns super simple bill", () => {
  const result = generateBill({
    Cheese: 1,
  });

  expect(result.subtotal).toBe(90);
  expect(result.total).toBe(90);
  expect(result.groceries).toHaveLength(1);
  expect(result.groceries[0].id).toBe("Cheese");
  expect(result.groceries[0].quantity).toBe(1);
  expect(result.discounts).toHaveLength(0);
});

test("soup returns super simple bill", () => {
  const result = generateBill({
    Soup: 1,
  });

  expect(result.subtotal).toBe(60);
  expect(result.total).toBe(60);
  expect(result.groceries).toHaveLength(1);
  expect(result.groceries[0].id).toBe("Soup");
  expect(result.groceries[0].quantity).toBe(1);
  expect(result.discounts).toHaveLength(0);
});

test("0 butters does not apply third off butter", () => {
  const result = generateBill({
    Butter: 0,
  });

  expect(result.subtotal).toBe(0);
  expect(result.total).toBe(0);
  expect(result.discountTotal).toBe(0);
  expect(result.discounts).toHaveLength(0);
});

test("2 butters apply third off butter", () => {
  const result = generateBill({
    Butter: 2,
  });

  expect(result.subtotal).toBe(240);
  expect(result.total).toBe(160);
  expect(result.discountTotal).toBe(80);
  expect(result.discounts).toHaveLength(1);
  expect(result.discounts[0].id).toBe("33% Off Butter");
  expect(result.discounts[0].quantity).toBe(2);
});

test("2 cheese, applies BOGOF Cheese once", () => {
  const result = generateBill({
    Cheese: 2,
  });

  expect(result.subtotal).toBe(180);
  expect(result.total).toBe(90);
  expect(result.discountTotal).toBe(90);
  expect(result.discounts).toHaveLength(1);
  expect(result.discounts[0].id).toBe("Buy One Get One Free on Cheese");
  expect(result.discounts[0].quantity).toBe(1);
});

test("3 cheese, applies BOGOF Cheese once", () => {
  const result = generateBill({
    Cheese: 3,
  });

  expect(result.subtotal).toBe(270);
  expect(result.total).toBe(180);
  expect(result.discountTotal).toBe(90);
  expect(result.discounts).toHaveLength(1);
  expect(result.discounts[0].id).toBe("Buy One Get One Free on Cheese");
  expect(result.discounts[0].quantity).toBe(1);
});

test("4 cheese, applies BOGOF Cheese twice", () => {
  const result = generateBill({
    Cheese: 4,
  });

  expect(result.subtotal).toBe(360);
  expect(result.total).toBe(180);
  expect(result.discountTotal).toBe(180);
  expect(result.discounts).toHaveLength(1);
  expect(result.discounts[0].id).toBe("Buy One Get One Free on Cheese");
  expect(result.discounts[0].quantity).toBe(2);
});

test("1 soup and 1 bread, applies Half Price Bread With Soup once", () => {
  const result = generateBill({
    Soup: 1,
    Bread: 1,
  });

  expect(result.subtotal).toBe(170);
  expect(result.total).toBe(115);
  expect(result.discountTotal).toBe(55);
  expect(result.discounts).toHaveLength(1);
  expect(result.discounts[0].id).toBe("Half Price Bread With Soup");
  expect(result.discounts[0].quantity).toBe(1);
});

test("2 soup and 1 bread, applies Half Price Bread With Soup once", () => {
  const result = generateBill({
    Soup: 2,
    Bread: 1,
  });

  expect(result.subtotal).toBe(230);
  expect(result.total).toBe(175);
  expect(result.discountTotal).toBe(55);
  expect(result.discounts).toHaveLength(1);
  expect(result.discounts[0].id).toBe("Half Price Bread With Soup");
  expect(result.discounts[0].quantity).toBe(1);
});

test("1 soup and 2 bread, applies Half Price Bread With Soup once", () => {
  const result = generateBill({
    Soup: 1,
    Bread: 2,
  });

  expect(result.subtotal).toBe(280);
  expect(result.total).toBe(225);
  expect(result.discountTotal).toBe(55);
  expect(result.discounts).toHaveLength(1);
  expect(result.discounts[0].id).toBe("Half Price Bread With Soup");
  expect(result.discounts[0].quantity).toBe(1);
});

test("2 soup and 2 bread, applies Half Price Bread With Soup once", () => {
  const result = generateBill({
    Soup: 2,
    Bread: 2,
  });

  expect(result.subtotal).toBe(340);
  expect(result.total).toBe(230);
  expect(result.discountTotal).toBe(110);
  expect(result.discounts).toHaveLength(1);
  expect(result.discounts[0].id).toBe("Half Price Bread With Soup");
  expect(result.discounts[0].quantity).toBe(2);
});

test("1 bread, 1 butter, 2 cheese, 1 milk, 1 soup, applies all discounts", () => {
  const result = generateBill({
    Bread: 1,
    Butter: 1,
    Cheese: 2,
    Milk: 1,
    Soup: 1,
  });

  expect(result.subtotal).toBe(520);
  expect(result.total).toBe(335);
  expect(result.discountTotal).toBe(185);
  expect(result.discounts).toHaveLength(3);
  expect(result.discounts.find(d => d.id === "Half Price Bread With Soup")!.quantity).toBe(1);
  expect(result.discounts.find(d => d.id === "Buy One Get One Free on Cheese")!.quantity).toBe(1);
  expect(result.discounts.find(d => d.id === "33% Off Butter")!.quantity).toBe(1);
});
