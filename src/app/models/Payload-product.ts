import { Product } from "./Product";

export type PayloadProduct = Omit<Product, 'id'>;
