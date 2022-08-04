import styles from './index.module.scss'

//assets
import logo from './assets/logo.png'
import cart from './assets/cart.svg'
import user from './assets/user.svg'
import search from './assets/search.svg'
import sneaker1 from './assets/sneakers/sneaker1.jpg'
import sneaker2 from './assets/sneakers/sneaker2.jpg'
import sneaker3 from './assets/sneakers/sneaker3.jpg'
import sneaker4 from './assets/sneakers/sneaker4.jpg'
import del from './assets/delete.svg'

//components
import Card from './components/Card/card'


function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
          <div className={styles.drawer}>
            <h2> Корзина </h2>

              <div className={styles.cart} > 
                  <div className={styles.cartItem}>
                    <img src={sneaker1} alt='sneaker1' width={70} height={70}/>

                    <div className={styles.itemPrice}>
                      <p> Мужские Кроссовки Nike Blazer Mid Suede </p>
                      <b> 12 999 руб.</b>

                    </div>
                    <img className={styles.remove} src={del} alt='delete'/>

                </div>

                
                <div className={styles.cartItem}>
                    <img src={sneaker1} alt='sneaker1' width={70} height={70}/>

                    <div className={styles.itemPrice}>
                      <p> Мужские Кроссовки Nike Blazer Mid Suede </p>
                      <b> 12 999 руб.</b>

                    </div>
                    <img className={styles.remove} src={del} alt='delete'/>

                </div>
              </div>

              <ul className={styles.cartTotalBlock}>
                <li>
                  <span> Итого: </span>
                  <div></div>
                  <b> 21 498 руб.  </b>
                </li>
                <li>
                  <span> Налог 5%:  </span>
                  <div></div>
                  <b> 1074 руб.  </b>
                </li>
              </ul>
              <button> Оформить заказ </button>


          </div>
      </div>

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
              <img src={cart} alt="cart" width={18} height={18}/> 
              <span> 1205 руб.</span>
            </li>
            <li>
            <img src={user} alt="user" width={18} height={18}/> 
            </li>
          </ul>
      </header>

      <div className={styles.content}>

        <div className={styles.title}>
          <h1> Все кроссовки </h1>

          <div className={styles.searchBar}>
            <img src={search} alt='search'/>
            <input placeholder='Поиск...'/>

          </div>
        </div>

        <div className={styles.sneakers}>
          <Card
            img={sneaker1}
            name={"Мужские Кроссовки Nike Blazer Mid Suede"}
            price={12999}
          />
          <Card
            img={sneaker2}
            name={"Мужские Кроссовки Nike Air Max 270"}
            price={12999}
          />
          <Card
            img={sneaker3}
            name={"Мужские Кроссовки Nike Blazer Mid Suede"}
            price={8499}
          />
          <Card
            img={sneaker4}
            name={"Кроссовки Puma X Aka Boku Future Rider"}
            price={8999}
          />
          
        </div>

      </div>
    </div>
  );
}

export default App;
