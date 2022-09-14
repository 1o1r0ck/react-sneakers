import styles from "./Drawer.module.scss";
import bArrow from "../../assets/backArrow.svg";
import { useContext } from "react";
import { AppContext } from "../../App";

const Info = ({ image, title, description }) => {
  const { setCartOpened } = useContext(AppContext);
  return (
    <div className={styles.emptyCart}>
      <img src={image} alt="cart" />
      <h3> {title} </h3>
      <h4>{description}</h4>
      <button onClick={() => setCartOpened(false)} className={styles.backBtn}>
        <img src={bArrow} alt="backArrow" /> Вернуться назад
      </button>
    </div>
  );
};

export default Info;
