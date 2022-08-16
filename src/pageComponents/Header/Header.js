import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.svg";
import user from "../../assets/user.svg";
import favorite from "../../assets/favorite.svg";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header>
      <div className={styles.headerLeft}>
      <Link to='/'>
      
        <img src={logo} alt="logo" width={40} height={40} />
        </Link>  
        <div className={styles.headerTitle}>
          <h3> React Sneakers </h3>
          <p> Магазин лучших кроссовок </p>
        </div>
      </div>

      <ul className={styles.headerInfo}>
        <li>
          <img
            onClick={props.onClickCart}
            src={cart}
            alt="cart"
            width={18}
            height={18}
          />
          <span> 1205 руб.</span>
        </li>
        <li>
          <Link to='/favorite'>
            <img src={favorite} alt="favorite" width={18} height={18} />
            </Link>
        </li>
        <li>
          <img src={user} alt="user" width={18} height={18} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
