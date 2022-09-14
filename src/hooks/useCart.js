import { useContext } from "react";
import { AppContext } from "../App";

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const total = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  return { cartItems, setCartItems, total };
};
