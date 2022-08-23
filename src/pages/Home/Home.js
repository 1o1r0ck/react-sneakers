import Card from "../../components/Card/card";
import search from "../../assets/search.svg";
import close from "../../assets/delete.svg";
import styles from "./Home.module.scss";

function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCard,
  onAddToFavorite,
}) {
  const clean = () => {
    setSearchValue("");
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <h1>
          {" "}
          {searchValue
            ? "Поиск по запросу:" + searchValue
            : "Все кроссовки"}{" "}
        </h1>

        <div className={styles.searchBar}>
          <img src={search} alt="search" />
          {searchValue && (
            <img
              onClick={clean}
              className={styles.close}
              src={close}
              alt="delete"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className={styles.sneakers}>
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => (
            <Card
              key={index}
              onPlus={(obj) => onAddToCard(item)}
              onFavorite={(obj) => onAddToFavorite(obj)}
              added = {cartItems.some(obj => Number(obj.id) === Number(item.id))} 
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
