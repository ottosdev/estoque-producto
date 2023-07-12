export type ProductPostOrPut = {
  name: string;
  price: number;
  quantity: number;
};

export interface ProductRequest {
  id: string;
  name: string;
  price: number;
  stock?: {
    id: string;
    quantity: string;
  };
}
