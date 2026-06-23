export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  discount?: string;
  category: string;
  thickness?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
