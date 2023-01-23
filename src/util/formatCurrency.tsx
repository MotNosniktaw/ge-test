export default function formatCurrency(amount: number) {
  const pence = amount % 100;
  const pounds = Math.floor(amount / 100);
  return "£" + pounds + "." + (pence === 0 ? "00" : pence < 10 ? "0" + pence : pence);
}
