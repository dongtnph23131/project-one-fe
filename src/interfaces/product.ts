export interface IProduct {
  _id?: number | string;
  name: string;
  price: number;
  image: string;
  description: string;
  discount: number;
  featured?: boolean;
  countInStock?: number;
  purchases?: number;
  priceSelling:number
}
