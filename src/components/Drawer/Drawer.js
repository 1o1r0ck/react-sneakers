import styles from "./Drawer.module.scss";

import offer from "../../assets/offer.jpg";
import del from "../../assets/delete.svg";
import empty from "../../assets/emptyCart.png";
import bArrow from "../../assets/backArrow.svg";
import fArrow from "../../assets/frontArrow.svg";
import Info from "./Info";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import axios from "axios";

const Drawer = ({ onClose, onRemove, items = [] }) => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/orders",
        { items: cartItems }
      );
      await axios.put("https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart", []);
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
    } catch (error) {
      alert("Не удалось создать заказ!");
    }
    setIsLoading(false);
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2>
          Корзина
          <img src={del} alt="close" onClick={onClose} />
        </h2>

        {items.length > 0 ? (
          <div className={styles.drawerItems}>
            <div className={styles.cart}>
              {items.map((obj) => (
                <div key={obj.id} className={styles.cartItem}>
                  <img src={obj.img} alt="sneaker" width={70} height={70} />
                  <div className={styles.itemPrice}>
                    <p> {obj.name} </p>
                    <b> {obj.price} руб.</b>
                  </div>
                  <img
                    className={styles.remove}
                    src={del}
                    alt="delete"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>

            <ul className={styles.cartTotalBlock}>
              <li>
                <span> Итого: </span>
                <div></div>
                <b> 21 498 руб. </b>
              </li>
              <li>
                <span> Налог 5%: </span>
                <div></div>
                <b> 1074 руб. </b>
              </li>
            </ul>
            <div className={styles.btn}>
              <button
                onClick={onClickOrder}
                disabled={isLoading}
                className={styles.createBtn}
              >
                Оформить заказ <img src={fArrow} alt="frontArrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            image={isOrderComplete ? offer : empty}
            description={
              isOrderComplete ? (
                <>
                  {" "}
                  Ваш заказ #{orderId} скоро будет передан курьерской доставке{" "}
                </>
              ) : (
                "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
