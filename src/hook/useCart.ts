import { useAppSelector } from '../store/hooks';

export default function useCart() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    cartItems,
    totalItems,
    totalPrice,
  };
}