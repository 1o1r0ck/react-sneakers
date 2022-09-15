import styles from "../Favorites/Favorite.module.scss";
import "../../components/Drawer/Drawer.module.scss";
import Card from "../../components/Card/card";
import sadSmile from "../../assets/sadSmile.png";
import { Link } from "react-router-dom";
import bArrow from "../../assets/backArrow.svg";
import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [isLoading, setIsLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.favorites}>

      {orders.length > 0 ?  <div>
        <h1>Мои Заказы</h1>

        <div className={styles.favoriteItems}>
          {(isLoading ? [...Array(8)] : orders).map((item, index) => (
            <Card key={index} {...item} loading={isLoading} />
          ))}
        </div>
      </div> :

<div className={styles.emptyFavorites}>
<img src={sadSmile} alt="Smile" width={70} height={70} />
<h3> У вас нет заказов </h3>
<h4> Оформите хотя бы один заказ. </h4>
<Link to="/">
  <button className={styles.backBtn}>
    <img src={bArrow} alt="backArrow" /> Вернуться назад
  </button>
</Link>
</div> 
      }
      

      
    </div>
  );
}

export default Orders;
