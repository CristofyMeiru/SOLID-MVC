export interface ProductProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function Create(name: string, price: number): ProductProps {
  return { id: crypto.randomUUID(), name, price, quantity: 0 };
}

export function IncreaseStock(product: ProductProps, amount: number): ProductProps {
  return {
    ...product,
    quantity: product.quantity + amount,
  };
}

export function DecreaseStock(product: ProductProps, amount: number): ProductProps {
  if (product.quantity < amount) throw new Error("Insufficient stock");
  return {
    ...product,
    quantity: product.quantity - amount,
  };
}
