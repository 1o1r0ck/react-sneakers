import styles from "./Drawer.module.scss";

import del from "../../assets/delete.svg";
import empty from "../../assets/emptyCart.png";
import bArrow from "../../assets/backArrow.svg";
import fArrow from "../../assets/frontArrow.svg";

const Drawer = ({ onClose, onRemove, items = [] }) => {
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
                <div key = {obj.id} className={styles.cartItem}>
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
              <button className={styles.createBtn}>
                {" "}
                Оформить заказ <img src={fArrow} alt="frontArrow" />{" "}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCart}>
            <img src={empty} alt="emptyCart" />
            <h3> Корзина пустая </h3>
            <h4>
              {" "}
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.{" "}
            </h4>
            <button onClick={onClose} className={styles.backBtn}>
              <img src={bArrow} alt="backArrow" /> Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
