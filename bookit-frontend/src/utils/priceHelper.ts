export const calcTotal = (price: number, qty: number, taxPercent = 6) => {
  const subtotal = price * qty;
  const taxes = Math.round((subtotal * taxPercent) / 100);
  const total = subtotal + taxes;
  return { subtotal, taxes, total };
};
