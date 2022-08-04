import styles from './index.module.scss'
import logo from './assets/logo.png'
import cart from './assets/cart.svg'
import user from './assets/user.svg'
import like from './assets/like.svg'
import Card from './components/Card/card'
import sneaker1 from './assets/sneakers/sneaker1.jpg'
import sneaker2 from './assets/sneakers/sneaker2.jpg'
import sneaker3 from './assets/sneakers/sneaker3.jpg'
import sneaker4 from './assets/sneakers/sneaker4.jpg'

function App() {
  return (
    <div className={styles.wrapper}>
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
        <h1> Все кроссовки </h1>
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
