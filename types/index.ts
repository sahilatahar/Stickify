export interface StickerInterface {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  stickerId: string;
  quantity: number;
}

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  address?: string;
  cartItems: CartItem[];
  orders: string[];
  createdAt: Date;
  updatedAt: Date;
}
