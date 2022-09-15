import styles from "./Favorite.module.scss";
import "../../components/Drawer/Drawer.module.scss";
import Card from "../../components/Card/card";
import crySmile from "../../assets/crySmile.png";
import { Link } from "react-router-dom";
import bArrow from "../../assets/backArrow.svg";
import { useContext } from "react";
import { AppContext } from "../../App";

function Favorite() {
  const { favorites, onAddToFavorite } = useContext(AppContext);
  return (
    <div className={styles.favorites}>
      {favorites.length > 0 ? (
        <div>
          <h1>Мои закладки</h1>

          <div className={styles.favoriteItems}>
            {favorites.map((item, index) => (
              <Card
                key={index}
                favorited={true}
                onFavorite={onAddToFavorite}
                {...item}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.emptyFavorites}>
          <img src={crySmile} alt="Smile" width={70} height={70} />
          <h3>Закладок нет </h3>
          <h4>Вы ничего не добавляли в закладки</h4>
          <Link to="/">
            <button className={styles.backBtn}>
              <img src={bArrow} alt="backArrow" /> Вернуться назад
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favorite;
