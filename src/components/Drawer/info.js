import styles from "./Drawer.module.scss";
import empty from "../../assets/emptyCart.png";
import bArrow from "../../assets/backArrow.svg";
import { useContext } from "react";
import { AppContext } from "../../App";

const info = ({title, description}) => {
    //const { setCartOpened } = useContext(AppContext);
  return (
    <div className={styles.emptyCart}>
            <img src={empty} alt="emptyCart" />
            <h3> {title} </h3>
            <h4>
              {description}
            </h4>
            <button  className={styles.backBtn}>
              <img src={bArrow} alt="backArrow" /> Вернуться назад
            </button>
          </div>
  )
}

export default info

//onClick={onClick}