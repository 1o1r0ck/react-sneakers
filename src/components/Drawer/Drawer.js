import styles from "./Drawer.module.scss";

import offer from "../../assets/offer.jpg";
import del from "../../assets/delete.svg";
import empty from "../../assets/emptyCart.png";
import fArrow from "../../assets/frontArrow.svg";
import Info from "./Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const Drawer = ({ onClose, onRemove, items = [], opened }) => {
  const { cartItems, setCartItems, total } = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const onClickOrder = async () => {
    const { data } = await axios.post(
      "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/orders",
      { items: cartItems }
    );

    setOrderId(data.id);
    setIsOrderComplete(true);
    setCartItems([]);

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      await axios.delete(
        "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart" + item.id
      );
      await delay();
    }
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.visible : ""}`}>
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
                <b> {total} руб. </b>
              </li>
              <li>
                <span> Налог 13%: </span>
                <div></div>
                <b> {Math.round((total / 100) * 13)} руб. </b>
              </li>
            </ul>
            <div className={styles.btn}>
              <button onClick={onClickOrder} className={styles.createBtn}>
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
