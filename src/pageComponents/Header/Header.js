import styles from './Header.module.scss'
import logo from '../../assets/logo.png'
import cart from '../../assets/cart.svg'
import user from '../../assets/user.svg'

const Header = (props) => {

    return(
        <header>
            <div className={styles.headerLeft}>
            <img src={logo} alt="logo" width={40} height={40}/>
            <div className={styles.headerTitle}>
                <h3> React Sneakers </h3>
                <p> Магазин лучших кроссовок </p>
            </div>
            </div>

            <ul className={styles.headerInfo}>
                <li> 
                <img onClick={props.onClickCart} src={cart} alt="cart" width={18} height={18}/> 
                <span> 1205 руб.</span>
                </li>
                <li>
                <img src={user} alt="user" width={18} height={18}/> 
                </li>
            </ul>
        </header>
    )
}

export default Header