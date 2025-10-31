interface ICartItem {
  id: string;
  count: number;
}

export interface ICartStore {
  items: ICartItem[];
  totalCount: number;
  totalPrice: number;
  add: (item: ICartItem) => void;
  remove: (itemId: string) => void;
}
