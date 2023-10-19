//This is a type for the basket items

export type Basket = {
  title: string;
  amount: number;
  price: number;
  image: string;
  size: string;
  color?: string;
  id: string;
  stock: number;
}[];
