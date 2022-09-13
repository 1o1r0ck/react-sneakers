import Card from "../../components/Card/card";
import search from "../../assets/search.svg";
import close from "../../assets/delete.svg";
import styles from "./Home.module.scss";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCard,
  onAddToFavorite,
  isLoading,
}) {


  const clean = () => {
    setSearchValue("");
  };

  

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
            <Card
              key={index}
              onPlus={(obj) => onAddToCard(item)}
              onFavorite={(obj) => onAddToFavorite(obj)}
              {...item}
              loading = {isLoading}
            />
          ))

  }

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
        { renderItems()}
      </div>
    </div>
  );
}

export default Home;
