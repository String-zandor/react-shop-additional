export function currency(price) {
  return `$${price.toFixed(2)}`;
}

export function generateId(products) {
  return products.length * 999 + 1;
}
