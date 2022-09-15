import React, { useState, useEffect, createContext } from "react";
import styles from "./index.module.scss";
import axios from "axios";

//components
import Header from "./pageComponents/Header/Header";
import Drawer from "./components/Drawer/Drawer";

import Home from "./pages/Home/Home";
import { Route } from "react-router-dom";
import Favorite from "./pages/Favorites/Favorite";
import Orders from "./pages/Orders/Orders";

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(
          "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart"
        );
        const favoritesResponse = await axios.get(
          "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/favorites"
        );
        const itemsResponse = await axios.get(
          "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/items"
        );
        setIsLoading(false);
  
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных!");
        console.log(error);
      }
      
    }
    fetchData();
  }, []);

  

  const onAddToCard = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));

      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart/${findItem.id}`);

      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    const findItemFav = favorites.find(
      (item) => Number(item.id) === Number(obj.id)
    );
    try {
      if (findItemFav) {
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
        axios.delete(
          `https://62f172ac25d9e8a2e7cc9e15.mockapi.io/favorites/${findItemFav.id}`
        );
      } else {
        setFavorites((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) =>
          prev.map((item) => {
            if (item.id === data.id) {
              return { ...item, id: data.id };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Не удалось добавить товар в закладки");
      console.log(error);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete("https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart/" + id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isItemLiked = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemLiked,
        onAddToCard,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className={styles.wrapper}>
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
            opened={cartOpened}
          />
        

        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCard={onAddToCard}
            onAddToFavorite={onAddToFavorite}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorite" exact>
          <Favorite />
        </Route>

        <Route path="/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
